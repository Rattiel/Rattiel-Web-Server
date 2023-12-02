module "console/thing/provider" {
    import {Dispatch} from "react";
    import {ThingPreview} from "console/thing";
    import {ThingModulePreview} from "console/thing/module";
    import {ThingModuleHistoryPreview} from "console/thing/module/history";
    
    type ThingEventType = "CREATE_THING" | "UPDATE_THING" | "DELETE_THING";
    
    type ThingModuleEventType = "CREATE_THING_MODULE" | "UPDATE_THING_MODULE" | "DELETE_THING_MODULE";
    
    
    interface RealTimeThingContextState {
        isThingLoading: boolean;
        things: Array<ThingPreview> | undefined;
        
        isThingModuleLoading: boolean;
        thingModules: Array<ThingModulePreview> | undefined;
    }
    
    type RealTimeThingContextAction = {
        type: "INIT_THING_LIST";
        things: Array<ThingPreview> | undefined;
    } | {
        type: "INIT_IS_THING_LOADING";
        isThingLoading: boolean;
    } | {
        type: ThingEventType;
        thing: ThingPreview;
    } | {
        type: "INIT_THING_MODULES_LIST";
        thingModules: Array<ThingModulePreview> | undefined;
    } | {
        type: "INIT_IS_THING_MODULE_LOADING";
        isThingModuleLoading: boolean;
    } | {
        type: ThingModuleEventType;
        thingModule: ThingModulePreview;
    };
    
    type RealTimeThingContextDispatch = Dispatch<RealTimeThingContextAction>;
    
    interface RealTimeThingModuleHistoryState {
        startTimestamp: number;
        endTimestamp: number;
        timeInterval: number;
        isHistoriesLoading: boolean;
        histories: Array<ThingModuleHistoryPreview> | undefined;
    }
    
    type RealTimeThingModuleHistoryStateAction = {
        type: "INIT_THING_MODULE_HISTORIES";
        histories: Array<ThingModuleHistoryPreview> | undefined;
    } | {
        type: "INIT_IS_THING_MODULE_HISTORIES_LOADING";
        isHistoriesLoading: boolean;
    } | {
        type: "APPEND_THING_MODULE_HISTORY";
        history: ThingModuleHistoryPreview;
    } | {
        type: "CHANGE_OPTIONS";
        startTimestamp: number;
        endTimestamp: number;
        timeInterval: number;
    };
    
    type RealTimeThingModuleHistoryStateDispatch = Dispatch<RealTimeThingModuleHistoryStateAction>;
}
