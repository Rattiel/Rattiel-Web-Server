module "console/farm/field" {
    import {FarmType} from "console/farm";
    
    interface FarmLocationField {
        bcode: string | null;
        address: string | null;
    }
    
    interface FarmPlantField {
        id: string | null;
        sowing: string | null;
    }
    
    interface FarmField {
        scale: number;
        type: FarmType;
        displayName: string;
        location: FarmLocationField;
        plant: FarmPlantField;
    }
}
