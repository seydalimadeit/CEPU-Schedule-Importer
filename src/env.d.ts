/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_GOOGLE_CLIENT_ID: string;
  readonly PUBLIC_GTAG: string;
  readonly PUBLIC_FEEDBACK_TG_BOT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}