import type { FetchDataOptions } from "@/types/fatch-data-options.interface";

export async function fetchData(options: FetchDataOptions) {
  try {
    const res = await fetch(options.url, {
      method: options.method || "GET",
      headers: options.headers || {
        "Content-Type": "application/json",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
