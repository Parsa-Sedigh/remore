import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {MatSidenav} from '@angular/material/sidenav';
import {DataService} from '../shared/data.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SocketService} from '../shared/socket.service';
// @ts-ignore
import * as io from 'socket.io-client';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  // private readonly socket: WebSocket = new WebSocket('ws://localhost:9400');
  // private readonly webSocketSubject: WebSocketSubject<any> = new webSocket<any>('ws://localhost:9400');
  readonly displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  readonly tableSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
  ];
  socketSubscription: Subscription | undefined;
  socket = io('http://remorebot.com', {
    path: '/un1/socket.io/'
  });


  @ViewChild('sidenav') sidenav: any;
  private sidenavSubscription: Subscription | undefined;
  readonly gaugeData = [
    {
      'name': 'UK',
      'value': 5200000
    },
    {
      'name': 'Italy',
      'value': 7700000
    },
    {
      'name': 'Spain',
      'value': 4300000
    }
  ];
  readonly colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };
  readonly gaugeDimensions: [number, number] = [400, 300];
  readonly verticalBarDimensions: [number, number] = [400, 300];
  readonly verticalBarData = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ];
  readonly xAxisLabel = 'hello1';
  readonly yAxisLabel = 'hello2';
  bitcoinPrice: number | undefined;


  constructor(private readonly dataService: DataService,
              private readonly router: Router,
              private readonly socketService: SocketService) {
  }

  ngOnInit(): void {
    this.socket.on('futuresLastPrice', (msg: any) => {
      console.log('futures: ', msg);
    });
    this.socket.on('lampSignal', (msg: any) => {
      console.log('lampSignal', msg);
    });
    this.socket.on('updateBitcoinChange', (bitcoinPrice: any) => {
      this.bitcoinPrice = bitcoinPrice;
    });
    // TODO: Don't implement this yet:
    // this.socket.on('updateMarketPrice', (msg: any) => {
    //   console.log('market: ', msg);
    // });
    // this.socketService.onNewMessage().on();
    // this.socketService.onNewMessage()
    // this.socket.on('', (e: any) => {
    //   console.log('connected', e);
    // });
    // this.webSocketSubject
    //   .subscribe((res: any) => console.log({res}));
  }

  ngAfterViewInit(): void {
    this.sidenavSubscription = this.dataService.currentSidenav
      .subscribe(sidenavState => {
        if (sidenavState) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      });
  }


  onCloseSidebar(): void {
    this.dataService.changeSidenav(false);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.sidenavSubscription?.unsubscribe();
  }

}
