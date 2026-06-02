from math import sqrt
from core.type import Num0_1


def promedio(arr: list[Num0_1], confianza: float = 1.93) -> bool:
    length = len(arr)
    promedio = sum(arr) / length
    promedio_estadistico = (promedio - 1 / 2) * sqrt(length) / sqrt(1 / 12)
    return abs(promedio_estadistico) < confianza


def frecuencia(
    arr: list[Num0_1], intervalos: int, confianza: float = 1.93
) -> bool:
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


def serie(arr: list[Num0_1], intervalos: int, confianza: float = 1.93) -> bool:
    if len(arr) % 2 != 0:
        return False
    f_list = [str(i / intervalos) for i in range(1, intervalos + 1)]
    f_obtenida: dict[tuple[str, str], int] = {(x, y): 0 for x in f_list for y in f_list}
    pares_ordenado: list[tuple[Num0_1, Num0_1]] = [
        (arr[i], arr[i + 1]) for i in range(0, len(arr), 2)
    ]
    for x, y in pares_ordenado:
        for limite_x, limite_y in f_obtenida.keys():
            if x <= float(limite_x) and y <= float(limite_y):
                f_obtenida[(limite_x, limite_y)] += 1
                break
    estadistico_obtenido = 0
    v_esperado = (len(arr) // 2) / (intervalos**2)
    for v_obtenido in f_obtenida.values():
        estadistico_obtenido += (v_obtenido - v_esperado) ** 2
    estadistico_obtenido *= (intervalos ** 2) / (len(arr) // 2)
    return estadistico_obtenido < confianza

def k_s(arr: list[Num0_1], confianza: float = 1.93) -> bool:
    arr_diff: list[float] = []

    for idx, num in enumerate(arr, start=1):
        num_diff = idx / len(arr) - arr[idx-1] # i/n - num_i
        arr_diff.append(abs(num_diff))
    return max(arr_diff) < confianza

def arriba_abajo_media(arr: list[Num0_1], confianza: float = 1.93) -> bool:
    num_consecutive: list[int] = [int((i <= 0.5)) for i in arr]
    f_obtenido: dict[int, int] = {}
    acumulador = 1
    valor_anterior = num_consecutive[0]
    max_value = 1
    for idx, num in enumerate(num_consecutive[1:]):
        max_value = max(max_value, acumulador)
        if num != valor_anterior:
            f_obtenido[acumulador] = f_obtenido.get(acumulador, 0) + 1
            acumulador = 1
        else:
            acumulador += 1

        if idx + 1 == len(num_consecutive[1:]):
            f_obtenido[acumulador] = f_obtenido.get(acumulador, 0) + 1
        valor_anterior = num
    estadistico_obtenido: float = 0
    for i in range(1, max_value + 1):
        f_esperada: float = (len(arr) - i + 3) / (2 ** (i + 1))
        estadistico_obtenido += (f_obtenido.get(i, 0) - f_esperada) ** 2 / f_esperada

    return estadistico_obtenido < confianza
