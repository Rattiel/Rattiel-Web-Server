module "console/farm/auto/control/field" {
    import {AutoControlType} from "console/farm/auto/control";
    
    interface FarmField {
        id: string | null;
    }
    
    interface AutoControlField {
        type: AutoControlType;
        enable: boolean;
        displayName: string | null;
        farm: FarmField;
    }
}
