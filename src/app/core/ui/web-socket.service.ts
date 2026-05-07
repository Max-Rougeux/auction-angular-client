import { Injectable } from '@angular/core';
import {Client} from '@stomp/stompjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client | null = null;
  private readonly handlers = new Map<string, (message: any) => void>();

  public register<T>(topic: string, handler: (message: T) => void) {
    this.handlers.set(topic, handler as (message: any) => void);

    if (this.client?.connected) {
      this.client.subscribe(topic, message => {
        handler(JSON.parse(message.body));
      });
    }
  }

  public connect() {
    this.client = new Client({
      brokerURL: `ws://${environment.WS_BASE_URL}/websocket`,
      onConnect: () => {
        this.handlers.forEach((handler, topic) => {
          this.client?.subscribe(topic, message => {
            handler(JSON.parse(message.body));
          });
        });
      },
      onDisconnect: () => console.log('WS disconnected'),
      onStompError: (frame) => console.error('STOMP error', frame), // 👈
    });
    this.client.activate();
  }

  public disconnect() {
    this.client?.deactivate();
  }
}
