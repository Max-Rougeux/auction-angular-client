import {effect, inject, Injectable} from '@angular/core';
import {Client, StompSubscription} from '@stomp/stompjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../action/auth.service';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client | null = null;
  private readonly handlers = new Map<string, (message: any) => void>();
  private readonly subscriptions = new Map<string, StompSubscription>();
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);

  constructor() {
    effect(() => {
      this.authService.isLoggedIn()
        ? this.connect()
        : this.disconnect();
    })
  }

  register<T>(topic: string, handler: (message: T) => void) {
    this.handlers.set(topic, handler as (message: any) => void);

    if (this.client?.connected) {
      const sub = this.client.subscribe(topic, message => {
        handler(JSON.parse(message.body));
      });
      this.subscriptions.set(topic, sub);
    }
  }

  unregister(topic: string) {
    this.subscriptions.get(topic)?.unsubscribe();
    this.subscriptions.delete(topic);
    this.handlers.delete(topic);
  }

  connect() {
    this.client = new Client({
      brokerURL: `ws://${environment.WS_BASE_URL}/websocket`,
      connectHeaders: {
        Authorization: `${this.tokenService.accessToken()}`
      },
      onConnect: () => {
        this.handlers.forEach((handler, topic) => {
          const sub = this.client!.subscribe(topic, message => {
            handler(JSON.parse(message.body));
          });
          this.subscriptions.set(topic, sub);

        });
      },
      onDisconnect: () =>this.subscriptions.clear(),
      onStompError: (frame) => console.error('STOMP error', frame),
    });
    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
  }
}
