module "console/farm" {
    import {PageResponse} from "console/util/response";
    type FarmType = "SINGLE" | "MULTI";
    
    interface FarmLocation {
        bcode: string | null;
        address: string | null;
    }
    
    interface FarmPlant {
        id: string | null;
        displayName: string | null;
        thumbnail: string | null;
        sowing: string | null;
    }
    
    interface FarmData {
        id: string;
        scale: number;
        type: FarmType;
        displayName: string;
        location: FarmLocation;
        plant: FarmPlant;
    }
    
    interface FarmPreview {
        id: string;
        scale: number;
        type: FarmType;
        displayName: string;
        autoControlId: string;
    }
    
    interface FarmPlantPageResponse<T> extends PageResponse<T> {
    }
    
    interface FarmListResponse<T> {
        farms: Array<T>;
    }
    
    interface FarmResponse<T> {
        farm: T;
    }
}
