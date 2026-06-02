from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from stadistic.probabilidad import normal
from stadistic.rng import generador


class StadisticService:
    COMPOSICION_POR_TIPO = {
        "Cobre Unipolar": {
            "frontend_key": "copperUnipolar",
            "copper": 0.60,
            "aluminum": 0.00,
            "plastic": 0.35,
            "other": 0.05,
        },
        "Aluminio": {
            "frontend_key": "aluminum",
            "copper": 0.00,
            "aluminum": 0.55,
            "plastic": 0.40,
            "other": 0.05,
        },
        "Mixto (Electronica)": {
            "frontend_key": "mixed",
            "copper": 0.35,
            "aluminum": 0.15,
            "plastic": 0.40,
            "other": 0.10,
        },
    }

    def __init__(self) -> None:
        self.run_id = ""
        self.lotes: list[dict] = []

    def configurar_semilla(self, seed: int | None) -> None:
        generador.configurar_mixto(seed)

    def iniciar_corrida(self) -> str:
        self.run_id = str(uuid4())
        self.lotes = []
        return self.run_id

    def simular_lote(self, dia: int) -> dict:
        lote = {
            "dia": dia,
            "nro_lote": dia,
            "peso_lote": self._generar_peso_lote(),
        }
        lote["tipo_cable"] = self._seleccionar_tipo_cable()
        lote["contaminacion"] = self._seleccionar_contaminacion()
        lote["perdidas_porcentaje"] = max(normal(8, 2), 0)
        lote["estado_proceso"] = self._determinar_estado_proceso(
            lote["tipo_cable"],
            lote["contaminacion"],
        )
        lote["estado_final"] = (
            "Mantenimiento preventivo"
            if lote["perdidas_porcentaje"] > 12
            else "Continuar proceso"
        )

        self._calcular_materiales(lote)
        self.lotes.append(lote)
        return lote

    def crear_dashboard(self, dias_totales: int, status: str, message: str | None = None) -> dict:
        total_peso = sum(lote["peso_lote"] for lote in self.lotes)
        total_cobre = sum(lote["cobre_recuperado_kg"] for lote in self.lotes)
        total_aluminio = sum(lote["aluminio_recuperado_kg"] for lote in self.lotes)
        total_plastico = sum(lote["plastico_kg"] for lote in self.lotes)
        total_otros = sum(lote["otros_kg"] for lote in self.lotes)
        total_perdidas = sum(lote["perdidas_kg"] for lote in self.lotes)
        total_recuperado = total_cobre + total_aluminio

        dashboard = {
            "runId": self.run_id,
            "status": status,
            "simulatedDays": len(self.lotes),
            "simulatedHours": len(self.lotes) * 24,
            "stages": self._crear_stages(total_peso, total_recuperado),
            "materials": {
                "copper": self._material_metric(total_cobre, total_peso),
                "aluminum": self._material_metric(total_aluminio, total_peso),
                "plastic": self._material_metric(total_plastico, total_peso),
                "other": self._material_metric(total_otros, total_peso),
            },
            "totals": {
                "cableReceivedKg": round(total_peso, 2),
                "recoveredKg": round(total_recuperado, 2),
                "lossesKg": round(total_perdidas, 2),
                "efficiencyPercentage": self._percentage(total_recuperado, total_peso),
            },
            "lots": self._contar_lotes(),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }

        if message is not None:
            dashboard["message"] = message

        return dashboard

    def _generar_peso_lote(self) -> float:
        u = self._gu()
        return 800 + 1200 * u

    def _seleccionar_tipo_cable(self) -> str:
        u = self._gu()
        if u <= 0.50:
            return "Cobre Unipolar"
        if u <= 0.80:
            return "Aluminio"
        return "Mixto (Electronica)"

    def _seleccionar_contaminacion(self) -> str:
        u = self._gu()
        if u <= 0.50:
            return "Baja"
        if u <= 0.90:
            return "Media"
        return "Alta"

    def _determinar_estado_proceso(self, tipo_cable: str, contaminacion: str) -> str:
        if tipo_cable == "Cobre Unipolar":
            if contaminacion == "Baja":
                return "Procesamiento inmediato"
            return "Clasificación adicional"

        if tipo_cable == "Aluminio":
            u = self._gu()
            if u <= 0.50:
                return "Almacenamiento temporal"
            return "Procesamiento normal"

        return "Clasificación detallada"

    def _calcular_materiales(self, lote: dict) -> None:
        composicion = self.COMPOSICION_POR_TIPO[lote["tipo_cable"]]
        peso = lote["peso_lote"]
        perdidas_kg = peso * lote["perdidas_porcentaje"] / 100

        lote["cobre_recuperado_kg"] = peso * composicion["copper"]
        lote["aluminio_recuperado_kg"] = peso * composicion["aluminum"]
        lote["plastico_kg"] = peso * composicion["plastic"]
        lote["otros_kg"] = peso * composicion["other"]
        lote["perdidas_kg"] = perdidas_kg
        lote["eficiencia_porcentaje"] = self._percentage(
            lote["cobre_recuperado_kg"] + lote["aluminio_recuperado_kg"],
            peso,
        )

    def _crear_stages(self, total_peso: float, total_recuperado: float) -> dict:
        return {
            "reception": {"kg": round(total_peso, 2)},
            "classification": {"kg": round(total_peso, 2)},
            "crushing": {"kg": round(total_peso, 2)},
            "separation": {"kg": round(total_recuperado, 2)},
            "output": {"kg": round(total_recuperado, 2)},
        }

    def _contar_lotes(self) -> dict:
        conteo = {
            "copperUnipolar": 0,
            "aluminum": 0,
            "mixed": 0,
        }
        for lote in self.lotes:
            frontend_key = self.COMPOSICION_POR_TIPO[lote["tipo_cable"]]["frontend_key"]
            conteo[frontend_key] += 1
        return conteo

    def _material_metric(self, kg: float, total_peso: float) -> dict:
        return {
            "kg": round(kg, 2),
            "percentage": self._percentage(kg, total_peso),
        }

    def _percentage(self, value: float, total: float) -> float:
        if total <= 0:
            return 0
        return round(value / total * 100, 2)

    def _gu(self) -> float:
        return float(generador.mixto(1)[0])


stadistic_service = StadisticService()
