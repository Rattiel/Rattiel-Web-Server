module "console/thing/module/history" {
    interface ThingModuleHistoryPreview {
        value: number;
        timestamp: number;
    }
    
    interface ThingModuleHistoryListResponse<T> {
        thingName: string,
        port: string;
        histories: Array<T>;
    }
}
