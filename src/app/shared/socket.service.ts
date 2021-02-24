import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://cors-anywhere.herokuapp.com/http://remorebot.com/un1', {
    //   transportOptions: {
    //   // polling: {
    //   //   extraHeaders: {
    //   //     'Access-Control-Allow-Origin': '*'
    //   //   }
    //   // }
    // }
    });
  }

  // EMITTER
  sendMessage(msg: string): void {
    this.socket.emit('sendMessage', { message: msg });
  }

  // HANDLER
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('futuresLastPrice', (msg: any) => {
        observer.next(msg);
      });
    });
  }
}
