module "auth" {
    import {auth} from "aws-iot-device-sdk-v2";
    import {Dispatch} from "react";
    import {AmplifyUser} from "@aws-amplify/ui";
    
    interface CognitoCredentialsProviderOption {
        credentials?: auth.AWSCredentials | undefined;
        region: string;
        debug?: boolean | undefined;
    }
    
    type AmplifyState = {
        user: AmplifyUser | null;
    }
    
    type AmplifyAction = {
        type: "UPDATE_USER";
        user: AmplifyUser | null;
    };
    
    type AmplifyDispatch = Dispatch<AmplifyAction>;
}
