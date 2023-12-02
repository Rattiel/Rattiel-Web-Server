namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_DOMAIN: string;
        readonly NEXT_PUBLIC_HOSTING_URL: string;
        readonly NEXT_PUBLIC_AWS_IOT_CORE_ENDPOINT: string;
        readonly NEXT_PUBLIC_DEBUG?: boolean | undefined;
    }
}
