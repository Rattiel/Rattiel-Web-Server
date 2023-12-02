module "console/farm/channel/group/provider" {
    import {Dispatch} from "react";
    import {ChannelGroupPreview} from "console/farm/channel/group";
    
    type ChannelGroupEventType = "CREATE_CHANNEL_GROUP" | "UPDATE_CHANNEL_GROUP" | "DELETE_CHANNEL_GROUP";
    
    interface RealTimeChannelGroupCollectionState {
        isLoading: boolean;
        error: any | undefined;
        revalidateCheck: boolean;
        data: Array<ChannelGroupPreview> | undefined;
    }
    
    type RealTimeChannelGroupCollectionAction = {
        type: "INIT_IS_LOADING";
        isLoading: boolean;
    } | {
        type: "INIT_ERROR";
        error: any | undefined;
    } | {
        type: "INIT_DATA";
        data: Array<ChannelGroupPreview> | undefined;
    } | {
        type: ChannelGroupEventType;
        data: ChannelGroupPreview;
    } | {
        type: "REVALIDATE";
    };
    
    type RealTimeChannelGroupCollectionDispatch = Dispatch<RealTimeChannelGroupCollectionAction>;
}
