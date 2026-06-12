import math
from itertools import accumulate
from application.simulation.statistics.rng import generador
from math import e, log
from typing import Callable
from core.type import Num0_1

def uniforme(min_v: float, max_v: float) -> float:
    """
        Probabilidad uniforme
        Args:
            min_v: el minimo valor
            max_v: el maximo valor
        Returns:
            float: un numero entre [min_v,max_v]
        """
    result = min_v + generador.mixto(1)[0] * (max_v - min_v)
    return result


def exponencial(alpha: float) -> Callable[[Num0_1], float]:
    """
        Probabilidad exponencial
        Args:
            alpha: cantidad/tiempo

        Returns:
            Callable[[float], int]: funcion la cual acepta un valor 'u' float [0,1] y devuelve un valor con la formula
            -1/alpha * log(u)
    """
    return lambda u: -1 / alpha * log(u)

def binomial(prob: list[Num0_1]) -> int:
    """
        Probabilidad binomial
        Args:
            prob (list[float]): una lista de numero que deben sumar 1

        Returns:
            int: el indice de la lista
    """
    if(len(prob) == 1):
        limites: list[float] = list(accumulate([prob[0], 1 - prob[0]]))
    else:
        limites: list[float] = list(accumulate(prob))
    if limites[-1] != 1:
        raise ValueError
    u = generador.mixto()[0]
    for idx, limite in enumerate(limites):
        if u <= limite:
            return idx

def normal(media: float, desvio: float) -> float:
    """
        Probabilidad normal
        Args:
            media: la media de la distribucion
            desvio: el desvio estandar de la distribucion
        Returns:
            (float): la curva normal aplicada con aletoriedad
    """
    flag: bool = False
    arr: list[float] = []
    while not flag: #mientras sea false
        arr = generador.mixto(12)
        flag = generador.__pruebas__(arr)
    suma: float = sum(arr)
    return desvio * ( suma - 6) + media

def poisson(alpha: float) -> int:
    """

    Args:
        alpha:

    Returns:

    """
    b: float = math.exp(-alpha)
    x: int = 0
    p = 1
    while p > b:
        u = generador.mixto(1)[0]
        x += 1
        p *= u
    return x

if __name__ == "__main__":
    foo = binomial([0.5, 0.3, 0.2])
    z = [foo(i) for i in [0.1, 0.2, 0.35, 0.40, 0.5, 0.6, 0.7, 0.8, 0.9, 1]]
    print(z)
