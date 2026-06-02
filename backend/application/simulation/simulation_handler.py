import asyncio

from application.simulation.simulation_service import StadisticService, simulation_service
from log import logger


class SimulationHandler:
    def __init__(self, service: StadisticService) -> None:
        self.service = service

    async def handle_set_seed(self, sio, sid, data: dict) -> None:
        seed = self._parse_optional_int(data.get("seed"))
        dias = self._parse_positive_int(data.get("dias") or data.get("cable"))

        logger.info(f"Mensaje de simulacion recibido [{sid}]: seed={seed}, dias={dias}")

        await sio.emit("setSeed", {"seed": data.get("seed", ""), "dias": str(dias or "")}, to=sid)

        if dias is None:
            await sio.emit(
                "simulationDashboard",
                self.service.crear_dashboard(
                    dias_totales=0,
                    status="error",
                    message="La cantidad de dias debe ser un entero positivo.",
                ),
                to=sid,
            )
            return

        self.service.configurar_semilla(seed)
        self.service.iniciar_corrida()

        for dia in range(1, dias + 1):
            self.service.simular_lote(dia)
            await sio.emit(
                "simulationDashboard",
                self.service.crear_dashboard(
                    dias_totales=dias,
                    status="running",
                    message=f"Procesando lote {dia} de {dias}.",
                ),
                to=sid,
            )
            await asyncio.sleep(0)

        await sio.emit(
            "simulationDashboard",
            self.service.crear_dashboard(
                dias_totales=dias,
                status="completed",
                message="Simulacion finalizada.",
            ),
            to=sid,
        )

    def _parse_optional_int(self, value) -> int | None:
        try:
            if value in (None, ""):
                return None
            return int(value)
        except (TypeError, ValueError):
            return None

    def _parse_positive_int(self, value) -> int | None:
        parsed = self._parse_optional_int(value)
        if parsed is None or parsed <= 0:
            return None
        return parsed


simulation_handler = SimulationHandler(simulation_service)
