import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class SocketService {
  // private socket: Socket;

  constructor() {

  }

  // EMITTER
  // sendMessage(msg: string): void {
  //   this.socket.emit('sendMessage', { message: msg });
  // }

  // HANDLER
  // onNewMessage() {
  //   return this.socket.on('futuresLastPrice', (msg: any) => {
  //     console.log(msg);
  //   });
  // }
}
