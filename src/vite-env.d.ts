/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_API_SERVICE_URL: string;
    // Add any other environment variables you need here
    [key: string]: any;
  };
}