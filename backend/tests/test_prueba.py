from stadistic import rng
import asyncio

# OBSOLETO: este archivo funciona como script exploratorio historico, no como
# test automatizado actual. Hoy rompe pytest porque usa "pruebas" sin importarlo.
# Se mantiene sin eliminar hasta reemplazarlo por tests del service/handler.
print("hola")
arr = rng.parte_central_cuadrado(6239, 4, 5)
print(arr)
arr = rng.lehmer(4122456, 756, 50)
print(arr)
arr = rng.congruencial_mixto(4, 5, 7, 8, 5)
print(arr)
arr = rng.congruencial_multiplicativo(1317, 5631, 547, 6)
print(arr)
arr = rng.congruencial_aditivo([1942, 2372, 5131, 3317], 5147, 5)
print(arr)
arr = [
    0.01,
    0.079,
    0.168,
    0.858,
    0.901,
    0.74,
    0.713,
    0.478,
    0.277,
    0.019,
    0.548,
    0.426,
]
resultado = asyncio.run(pruebas.promedio(arr, 0.957))
print(resultado)
resultado = asyncio.run(pruebas.frecuencia(arr, 3, 0.65))
print(resultado)
resultado = asyncio.run(pruebas.serie(arr, 2, 0.675))

resultado = asyncio.run(pruebas.arriba_abajo_media(arr, 7.81))
print(resultado)
print(resultado)
arr = [
    0.01,
    0.019,
    0.079,
    0.168,
    0.277,
    0.426,
    0.478,
    0.548,
    0.713,
    0.74,
    0.858,
    0.901
]
resultado = asyncio.run(pruebas.k_s(arr, 0.375))
print(resultado)
