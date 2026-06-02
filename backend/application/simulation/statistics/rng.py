import time
from datetime import datetime

from pydantic import BaseModel
from core.type import Num0_1
from application.simulation.statistics import pruebas
import asyncio
from math import sqrt

# OBSOLETO/PENDIENTE DE REVISION: las funciones de generacion alternativas y
# las pruebas asincronicas quedan como material historico del proyecto. La
# simulacion actual solo usa generador.mixto()
def parte_central_cuadrado(seed: int, num: int, total: int = 1) -> list[Num0_1]:
    """
    Metodo parte central del cuadrado.

    Args:
        seed (int): Seed inicial
        num (int): nro de digitos deseados
        total (int): la cant total de numeros

    Return:
        list[float]: el vector con los numeros aletorios entre [0,1]
    """
    arr: list[Num0_1] = []
    for i in range(total):
        x = seed**2
        if (len(f"x") - num) % 2 != 0:
            x *= 10
        string = f"{x}"
        length_mean = len(string) // 2
        x = int(string[length_mean - num // 2 : length_mean + num // 2 + 1])
        # print(x)

        seed = x
        arr.append(to_float(x))
    return arr


def lehmer(seed: int, num_dig: int, total: int = 1) -> list[Num0_1]:
    """
    Metodo lehmer.

    Args:
        seed (int): Seed inicial.
        num_dig (int): cantidad de digitos usados.
        total (int): cantidad total de numeros.

    Return:
        list[float]: el vector con los numeros aletorios entre [0,1]
    """
    arr: list[Num0_1] = []
    for i in range(total):
        num_len = len(f"{num_dig}")
        if num_len > len(f"{seed}"):
            return arr
        num_string = f"{seed * num_dig}"
        num1, num2 = int(num_string[:num_len]), int(num_string[num_len:])
        seed = abs(num2 - num1)
        arr.append(to_float(seed))
    return arr


def congruencial_multiplicativo(
    seed: int, const_mul: int, mod: int, total: int = 1
) -> list[Num0_1]:
    """
    Metodo congruencial multiplicativo.

    Args:
        seed (int): Seed inicial.
        const_mul (int): constante multiplicativa.
        mod (int): modulo.
        total (int): cantidad total de numeros.

    Return:
        list[float]: el vector con los numeros aletorios entre [0,1]
    """
    return congruencial_mixto(seed, const_mul, 0, mod, total)


def congruencial_aditivo(
    array_inicial: list[int], mod: int, total: int = 1
) -> list[Num0_1]:
    """
    Metodo congruencial aditivo.

    Args:
        array_inicial (list[int]): vector de numeros enteros.
        mod (int): modulo.
        total (int): cantidad total de numeros.

    Return:
        list[float]: el vector con los numeros aletorios entre [0,1]
    """
    arr: list[Num0_1] = []
    len_arr_inicial = len(array_inicial)  # valor del array inicial
    for i in range(total):
        num: int = (array_inicial[i] + array_inicial[-1]) % mod
        arr.append(num / mod)
        array_inicial.append(num)
    return arr


def congruencial_mixto(
    seed: int, const_mul: int, const_aditiva: int, mod: int, total: int = 1
) -> list[Num0_1]:
    """
    Metodo congruencial mixto.

    Args:
        seed (int): Seed inicial.
        const_mul (int): constante multiplicativa.
        const_aditiva (int): constante aditiva.
        mod (int): modulo.
        total (int): cantidad total de numeros.

    Return:
        list[float]: el vector con los numeros aletorios entre [0,1]
    """
    arr: list[Num0_1] = []
    for _ in range(total):
        num: int = const_mul * seed + const_aditiva
        seed = num % mod

        arr.append(seed / mod)
    return arr


def to_float(num: int) -> Num0_1:
    """
    Transforma un entero X en un float 0.X
    Args:
         num (int): entero a transformar
    Return:
        float: entero transformado
    """
    if num < 0:
        return Num0_1(f"-0.{abs(num)}")
    else:
        return Num0_1(f"0.{num}")

class Congruencial(BaseModel):
    __arr: list[int] = []

    seed: int
    mult: int
    aditiva: int
    mod: int
    async def __pruebas__(self, arr: list[Num0_1]) -> bool:
        # OBSOLETO: se conserva para experimentos con generadores alternativos.
        # No debe ejecutarse desde el handler async de Socket.IO.
        task_pruebas = [
            asyncio.create_task(pruebas.promedio(arr, 0.957)),
            asyncio.create_task(pruebas.frecuencia(arr, 2, 0.675)),
            asyncio.create_task(pruebas.serie(arr, 3, 0.957)),
            asyncio.create_task(pruebas.k_s(arr, 0.375)),
            asyncio.create_task(pruebas.arriba_abajo_media(arr, 7.81))
        ]
        for task in asyncio.as_completed(task_pruebas):
            try:
                exito = await task

                print(f"DEBUG: Una tarea terminó con: {exito}")
                if exito:
                    for t in task_pruebas:
                        if not t.done(): t.cancel()
                    return True
            except asyncio.CancelledError:
                continue
            except Exception as e:
                print(f"Error en las pruebas: {e}")
        return False

    def mixto(self, total: int = 1) -> list[Num0_1]:
        arr: list[Num0_1] = []
        self.__normalizar_parametros__()
        for _ in range(total):
            self.seed = (self.mult * self.seed + self.aditiva) % self.mod
            arr.append(self.seed / self.mod)
        return arr

    def configurar_mixto(self, seed: int | None = None) -> None:
        if seed is not None:
            self.seed = max(seed, 1)

        self.mult = 1_103_515_245
        self.aditiva = 12_345
        self.mod = 2**31

    def aditivo(self, total: int = 1) -> list[Num0_1]:
        # OBSOLETO: no participa en el flujo actual de lotes/dashboard.
        if len(self.__arr) < 2: self.__random__()
        flag = False
        arr: list[float] = []
        while not flag:
            arr = congruencial_aditivo(self.__arr, self.mod, total)
            flag = self.__validar__(arr)

            self.__random__()

        self.__internal_arr__(arr)
        return self.__arr

    def multiplicativo(self, total: int = 1):
        # OBSOLETO: no participa en el flujo actual de lotes/dashboard.
        flag = False
        arr: list[float] = []
        while not flag:
            arr = congruencial_multiplicativo(self.seed, self.mult, self.mod, total)
            flag = self.__validar__(arr)

            self.__random__()

        self.__internal_arr__(arr)
        return self.__arr


    def __internal_arr__(self, arr: list[Num0_1]):
        self.__arr = [int((str(n).split('.')[1])) for n in arr]

    def __validar__(self, arr: list[Num0_1]) -> bool:
        if len(arr) < 2:
            return True

        try:
            asyncio.get_running_loop()
        except RuntimeError:
            return asyncio.run(self.__pruebas__(arr))

        return self.__promedio__(arr, 0.957) or self.__frecuencia__(arr, 2, 0.675)

    def __promedio__(self, arr: list[Num0_1], confianza: float) -> bool:
        promedio = sum(arr) / len(arr)
        promedio_estadistico = (promedio - 1 / 2) * sqrt(len(arr)) / sqrt(1 / 12)
        return abs(promedio_estadistico) < confianza

    def __frecuencia__(self, arr: list[Num0_1], intervalos: int, confianza: float) -> bool:
        f_obtenida: dict[str, int] = {
            str(i / intervalos): 0 for i in range(1, intervalos + 1)
        }
        for num in arr:
            for limite in f_obtenida.keys():
                if num <= float(limite):
                    f_obtenida[limite] += 1
                    break

        obtenido: float = 0
        v_esperado = len(arr) / intervalos
        for v_obtenido in f_obtenida.values():
            obtenido += (v_obtenido - v_esperado) ** 2

        obtenido *= intervalos / len(arr)
        return obtenido < confianza

    def __random__(self):
        if len(self.__arr) < 4:
            arr: list[Num0_1] = self.__mixto__(5)
            self.__internal_arr__(arr)

        self.seed = self.__arr[-1]
        self.mult = self.__arr[-2]
        self.aditiva = self.__arr[0]
        self.mod = max(self.seed % self.__arr[1], 1)

    def __normalizar_parametros__(self) -> None:
        self.seed = max(int(self.seed), 1)
        self.mult = max(int(self.mult), 1)
        self.aditiva = max(int(self.aditiva), 1)
        self.mod = max(int(self.mod), 2)

    def __mixto__(self, total = 1) -> list[Num0_1]:
        return congruencial_mixto(self.seed, self.mult, self.aditiva, self.mod, total)

    def get_arr(self) -> list[int]:
        return self.__arr

generador = Congruencial(
        seed= time.time_ns(),
        aditiva= datetime.now().minute,
        mult= datetime.now().second,
        mod= datetime.now().microsecond)
