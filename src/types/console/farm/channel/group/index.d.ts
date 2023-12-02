module "console/farm/channel/group" {
    import {FarmPreview} from "console/farm";
    import {ChannelPreview} from "console/farm/channel";
    
    type ChannelGroupType =
        // 제어 그룹
        "WINDOW_GROUP" | "CURTAIN_GROUP" |
        "LED_GROUP" | "FAN_GROUP" |
        // 센서 그룹
        "INSIDE_SENSOR_GROUP" | "OUTSIDE_SENSOR_GROUP" |
        "GROUND_SENSOR_GROUP" | "WATER_SENSOR_GROUP";
    
    type ChannelControlMode = "GROUP_BY" | "ONE_BY_ONE";
    
    interface ChannelGroupControl {
        mode: ChannelControlMode | null;
        state: number | null;
    }
    
    interface ChannelGroupData {
        id: string;
        displayName: string;
        type: ChannelGroupType;
        control: ChannelGroupControl;
        farm: FarmPreview;
    }
    
    interface ChannelGroupPreview {
        id: string;
        displayName: string;
        type: ChannelGroupType;
        control: ChannelGroupControl;
        farmId: string;
    }
    
    interface ChannelGroupPreviewWithChannels extends ChannelGroupPreview {
        channels: Array<ChannelPreview>;
    }
    
    interface ChannelGroupListResponse<T> {
        channelGroups: Array<T>;
    }
    
    interface ChannelGroupResponse<T> {
        channelGroup: T;
    }
}
