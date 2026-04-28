export interface UploadResponse {
  temp_path: string;
  columns: string[];
  row_count: number;
  preview_rows: Record<string, any>[];
}

export interface BiasedGroup {
  group: string;
  count?: number;
  approval_rate: number;
  baseline_rate: number;
  difference: number;
  severity: string;
  ranking_reason?: string;
}

export interface ScanResponse {
  dataset_path: string;
  total_rows: number;
  groups_scanned: number;
  fairness_score: number;
  severity_breakdown: Record<string, number>;
  groups: Record<string, any>[];
  top_groups: Record<string, any>[];
  biased_groups_found: number;
  top_biased_groups: BiasedGroup[];
  target_column?: string;
  message?: string;
}

export interface ExplainResponse {
  explanation: string;
  recommendations: string[];
}


