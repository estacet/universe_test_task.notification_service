export interface PushNotificator {
    send(body: any);
}

export const PushNotificator = Symbol('PushNotificator');