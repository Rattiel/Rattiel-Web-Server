module "console/farm/channel/group/field" {
    import {ChannelGroupType} from "console/farm/channel/group";
    
    interface FarmChannelField {
        id: string | null;
    }
    
    interface ChannelGroupField {
        farm: FarmChannelField;
        displayName: string;
        type: ChannelGroupType;
    }
}
