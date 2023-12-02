module "console/farm/auto/control/provider" {
    import {Dispatch} from "react";
    import {AutoControlPreview} from "console/farm/auto/control";
    
    type AutoControlEventType = "CREATE_AUTO_CONTROL" | "UPDATE_AUTO_CONTROL" | "DELETE_AUTO_CONTROL";
    
    interface RealTimeAutoControlCollectionState {
        isLoading: boolean;
        error: any | undefined;
        revalidateCheck: boolean;
        data: Array<AutoControlPreview> | undefined;
    }
    
    type RealTimeAutoControlCollectionAction = {
        type: "INIT_IS_LOADING";
        isLoading: boolean;
    } | {
        type: "INIT_ERROR";
        error: any | undefined;
    } | {
        type: "INIT_DATA";
        data: Array<AutoControlPreview> | undefined;
    } | {
        type: AutoControlEventType;
        data: AutoControlPreview;
    } | {
        type: "REVALIDATE";
    };
    
    type RealTimeAutoControlCollectionDispatch = Dispatch<RealTimeAutoControlCollectionAction>;
}
