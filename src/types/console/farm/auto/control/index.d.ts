module "console/farm/auto/control" {
    import {FarmPreview} from "console/farm";
    type AutoControlType = "STANDARD" | "PRO" | "PREMIUM";
    
    interface AutoControlData {
        id: string;
        type: AutoControlType;
        enable: boolean;
        displayName: string | null;
        farm: FarmPreview;
    }
    
    interface AutoControlPreview {
        id: string;
        type: AutoControlType;
        enable: boolean;
        displayName: string | null;
    }
    
    interface AutoControlListResponse<T> {
        autoControls: Array<T>;
    }
    
    interface AutoControlResponse<T> {
        autoControl: T | null;
    }
}
