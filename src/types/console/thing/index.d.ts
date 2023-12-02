module "console/thing" {
    interface ThingData {
        name: string;
        typeName: string | null;
        displayName: string | null;
        serial: string | null;
    }
    
    interface ThingPreview {
        name: string;
        typeName: string | null;
        displayName: string | null;
        serial: string | null;
    }
    
    interface ThingListResponse<T> {
        things: Array<T>;
    }
    
    interface ThingResponse<T> {
        thing: T;
    }
}
