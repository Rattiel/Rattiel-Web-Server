module "console/farm/channel/field" {
    import {ChannelType} from "console/farm/channel";
    import {ChannelGroupType} from "console/farm/channel/group";
    
    interface ChannelModuleField {
        thingName: string | null;
        port: string | null;
    }
    
    interface ChannelGroupField {
        id: string | null;
        farmId: string | null;
        type: ChannelGroupType | null;
    }
    
    interface FarmChannelField {
        displayName: string;
        type: ChannelType | null;
        module: ChannelModuleField;
        group: ChannelGroupField;
    }
}
