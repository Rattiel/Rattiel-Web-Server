module "console/farm/channel/provider" {
    import {Dispatch} from "react";
    import {ChannelPreview} from "console/farm/channel";
    
    type ChannelEventType = "CREATE_CHANNEL" | "UPDATE_CHANNEL" | "DELETE_CHANNEL";
    
    interface RealTimeChannelCollectionState {
        isLoading: boolean;
        error: any | undefined;
        revalidateCheck: boolean;
        data: Array<ChannelPreview> | undefined;
    }
    
    type RealTimeChannelCollectionAction = {
        type: "INIT_IS_LOADING";
        isLoading: boolean;
    } | {
        type: "INIT_ERROR";
        error: any | undefined;
    } | {
        type: "INIT_DATA";
        data: Array<ChannelPreview> | undefined;
    } | {
        type: ChannelEventType;
        data: ChannelPreview;
    } | {
        type: "REVALIDATE";
    };
    
    type RealTimeChannelCollectionDispatch = Dispatch<RealTimeChannelCollectionAction>;
}
