module "console/farm/channel" {
    import {FarmPreview} from "console/farm";
    import {ChannelGroupPreview} from "console/farm/channel/group";
    
    type ChannelType =
    // 측창
        "LEFT_FIRST_SIDE_WINDOW" | "RIGHT_FIRST_SIDE_WINDOW" |
        "LEFT_SECOND_SIDE_WINDOW" | "RIGHT_SECOND_SIDE_WINDOW" |
        
        // 천창
        "LEFT_FIRST_CEILING_WINDOW" | "RIGHT_FIRST_CEILING_WINDOW" |
        "LEFT_SECOND_CEILING_WINDOW" | "RIGHT_SECOND_CEILING_WINDOW" |
        
        // 차광 커튼
        "LEFT_LIGHT_CURTAIN" | "RIGHT_LIGHT_CURTAIN" |
        
        // 보온 커튼
        "LEFT_WARM_CURTAIN" | "RIGHT_WARM_CURTAIN" |
        
        // LED
        "LED" |
        
        // 환기/유동팬
        "FLUID_FAN" | "VENT_FAN" |
        
        // 실내 센서
        "INSIDE_CO2_SENSOR" | "INSIDE_HUMIDITY_SENSOR" | "INSIDE_TEMPERATURE_SENSOR" |
        
        // 외부 센서
        "OUTSIDE_CO2_SENSOR" | "OUTSIDE_HUMIDITY_SENSOR" | "OUTSIDE_TEMPERATURE_SENSOR" |
        
        // 토양 센서
        "GROUND_EC_SENSOR" | "GROUND_PH_SENSOR" | "GROUND_HUMIDITY_SENSOR" | "GROUND_TEMPERATURE_SENSOR" |
        
        // 수경 센서
        "WATER_EC_SENSOR" | "WATER_PH_SENSOR" | "WATER_TEMPERATURE_SENSOR";
    
    interface ChannelModule {
        thingName: string | null;
        port: string | null;
    }
    
    interface ChannelPreview {
        id: string;
        displayName: string;
        type: ChannelType;
        module: ChannelModule;
        groupId: string;
    }
    
    interface ChannelData {
        id: string;
        displayName: string;
        type: ChannelType;
        module: ChannelModule;
        farm: FarmPreview;
        group: ChannelGroupPreview;
    }
    
    interface ChannelResponse<T> {
        channel: T;
    }
    
    interface ChannelListResponse<T> {
        channels: Array<T>;
    }
}
