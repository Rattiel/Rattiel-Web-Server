module "console/farm/provider" {
    import {Dispatch} from "react";
    import {FarmPreview} from "console/farm";
    
    type FarmEventType = "CREATE_FARM" | "UPDATE_FARM" | "DELETE_FARM";
    
    interface RealTimeFarmCollectionState {
        isLoading: boolean;
        error: any | undefined;
        revalidateCheck: boolean;
        data: Array<FarmPreview> | undefined;
    }
    
    type RealTimeFarmCollectionAction = {
        type: "INIT_IS_LOADING";
        isLoading: boolean;
    } | {
        type: "INIT_ERROR";
        error: any | undefined;
    } | {
        type: "INIT_DATA";
        data: Array<FarmPreview> | undefined;
    } | {
        type: FarmEventType;
        data: FarmPreview;
    } | {
        type: "REVALIDATE";
    };
    
    type RealTimeFarmCollectionDispatch = Dispatch<RealTimeFarmCollectionAction>;
}
