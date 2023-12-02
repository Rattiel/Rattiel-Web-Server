namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_DOMAIN: string;
        readonly NEXT_PUBLIC_HOSTING_URL: string;
        readonly NEXT_PUBLIC_API_SERVER_ENDPOINT: string;
        readonly NEXT_PUBLIC_DEBUG?: boolean | undefined;
    }
}
