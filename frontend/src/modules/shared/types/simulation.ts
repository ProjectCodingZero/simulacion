export type SimulationStatus =
  | "idle"
  | "running"
  | "completed"
  | "paused"
  | "error";

export type ProcessStageId = keyof SimulationStages;

export type MaterialId = keyof SimulationMaterials;

export interface StageMetric {
  kg: number;
}

export interface MaterialMetric {
  kg: number;
  percentage: number;
}

export interface SimulationStages {
  reception: StageMetric;
  classification: StageMetric;
  crushing: StageMetric;
  separation: StageMetric;
  output: StageMetric;
}

export interface SimulationMaterials {
  copper: MaterialMetric;
  aluminum: MaterialMetric;
  plastic: MaterialMetric;
  other: MaterialMetric;
}

export interface SimulationTotals {
  cableReceivedKg: number;
  recoveredKg: number;
  recoveredNotMetallicKg: number;
  lossesKg: number;
  efficiencyPercentage: number;
}

export interface SimulationLots {
  copperUnipolar: number;
  aluminum: number;
  mixed: number;
}

export interface SimulationDashboardPayload {
  runId: string;
  status: SimulationStatus;
  simulatedDays: number;
  simulatedHours: number;
  stages: SimulationStages;
  materials: SimulationMaterials;
  totals: SimulationTotals;
  lots: SimulationLots;
  updatedAt: string;
  message?: string;
}
