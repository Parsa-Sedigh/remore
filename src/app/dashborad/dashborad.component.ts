import { Component, OnInit } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.scss']
})
export class DashboradComponent implements OnInit {
  private readonly webSocketSubject: WebSocketSubject<any> = new webSocket('http://remorebot.com');

  constructor() { }

  ngOnInit(): void {
    this.webSocketSubject
      .subscribe();
  }

}
