module "console/thing/module" {
    type ThingModuleType =
        "SENSOR" | "ACTUATOR";
    
    type ThingModuleModel =
        "MOTOR_DRIVER" | "RELAY_DRIVER" |
        // 실내 센서
        "INSIDE_CO2_SENSOR" | "INSIDE_HUMIDITY_SENSOR" | "INSIDE_TEMPERATURE_SENSOR" |
        
        // 외부 센서
        "OUTSIDE_CO2_SENSOR" | "OUTSIDE_HUMIDITY_SENSOR" | "OUTSIDE_TEMPERATURE_SENSOR" |
        
        // 토양 센서
        "GROUND_EC_SENSOR" | "GROUND_PH_SENSOR" | "GROUND_HUMIDITY_SENSOR" | "GROUND_TEMPERATURE_SENSOR" |
        
        // 수경 센서
        "WATER_EC_SENSOR" | "WATER_PH_SENSOR" | "WATER_TEMPERATURE_SENSOR";
    
    type ThingModuleMode = "MANUAL" | "SEMI_MANUAL" | "REMOTE";
    
    interface ThingModulePreview {
        thingName: string;
        port: string;
        type: ThingModuleType;
        model: ThingModuleModel;
        mode: ThingModuleMode;
        state: number;
        level: number;
        max: number;
        min: number;
        updated: number;
    }
    
    interface ThingModuleListResponse<T> {
        modules: Array<T>;
    }
    
    interface ThingModuleResponse<T> {
        module: T;
    }
}
