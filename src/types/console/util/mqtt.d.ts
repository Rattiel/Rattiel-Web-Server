module "console/util/mqtt" {
    import {Dispatch} from "react";
    import {mqtt5} from "aws-iot-device-sdk-v2";
    
    interface MqttMessage {
        topicName: string;
        payload?: string | undefined;
    }
    
    interface MqttSubscribeOption {
        topicName: string;
        qos?: mqtt5.QoS | undefined;
        callback: (message: MqttMessage) => void;
    }
    
    interface AwsMqttClientOption {
        region: string;
        endpoint: string;
        debug?: boolean | undefined;
    }
    
    interface MqttClient {
        connected: boolean;
        
        start(): void;
        
        stop(): void;
        
        subscribe(options: MqttSubscribeOption): Promise<string>;
        
        unsubscribe(id: string): Promise<void>;
        
        onConnected(callback: () => void): void;
    }
    
    interface MqttState {
        client: MqttClient;
    }
    
    interface MqttAction {
    
    }
    
    type MqttDispatch = Dispatch<MqttAction>;
}
