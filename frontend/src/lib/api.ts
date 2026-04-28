import type {
  UploadResponse,
  ScanResponse,
  ExplainResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" && window.location.port !== "3000" ? "/api" : "http://localhost:8000/api");

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Upload a CSV file and get preview data
 */
export async function uploadCsv(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${API_URL}/upload`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Run bias scan on dataset
 */
export async function scanBias(request: {
  dataset_path: string;
  target_column?: string;
}): Promise<ScanResponse> {
  return fetcher("/scan", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Get latest scan report
 */
export async function getReport(): Promise<ScanResponse | null> {
  try {
    return await fetcher("/report");
  } catch {
    return null;
  }
}

/**
 * Get explanation for a biased group
 */
export async function explain(request: {
  group: string;
  count?: number;
  approval_rate: number;
  baseline_rate: number;
  difference: number;
  severity: string;
  ranking_reason?: string;
}): Promise<ExplainResponse> {
  return fetcher("/explain", {
    method: "POST",
    body: JSON.stringify(request),
  });
}


