type RuntimeConfig = {
  API_URL?: string;
};

let runtimeConfig: RuntimeConfig = {};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const loadRuntimeConfig = async () => {
  try {
    const response = await fetch("/env.json", { cache: "no-store" });
    if (!response.ok) return;

    runtimeConfig = (await response.json()) as RuntimeConfig;
  } catch {
    runtimeConfig = {};
  }
};

export const appConfig = {
  get apiUrl() {
    return trimTrailingSlash(runtimeConfig.API_URL || "/api");
  },
};
