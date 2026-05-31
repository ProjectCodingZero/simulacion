import type { SimulationDashboardPayload } from "@/modules/shared/types/simulation.ts";

export const INITIAL_SIMULATION_DASHBOARD: SimulationDashboardPayload = {
  runId: "",
  status: "idle",
  simulatedDays: 0,
  simulatedHours: 0,
  stages: {
    reception: { kg: 0 },
    classification: { kg: 0 },
    crushing: { kg: 0 },
    separation: { kg: 0 },
    output: { kg: 0 },
  },
  materials: {
    copper: { kg: 0, percentage: 0 },
    aluminum: { kg: 0, percentage: 0 },
    plastic: { kg: 0, percentage: 0 },
    other: { kg: 0, percentage: 0 },
    losses: { kg: 0, percentage: 0 },
  },
  totals: {
    cableReceivedKg: 0,
    recoveredKg: 0,
    lossesKg: 0,
    efficiencyPercentage: 0,
  },
  lots: {
    copperUnipolar: 0,
    aluminum: 0,
    mixed: 0,
  },
  updatedAt: "",
};
