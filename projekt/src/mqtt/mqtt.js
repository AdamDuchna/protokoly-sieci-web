import mqtt from 'mqtt';
export var client;
export var isSubed;
export var payload;
export var connectStatus;
export const mqttConnect = (host) => {
    connectStatus = 'Connecting'
    client = mqtt.connect(host)
  };

  export const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        connectStatus = 'Connect'
      });
    }
  }

  export const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  export const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        isSubed = true
      });
    }
  };

  export const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        isSubed = false
      });
    }
  };
