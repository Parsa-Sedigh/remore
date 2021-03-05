import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {MatSidenav} from '@angular/material/sidenav';
import {DataService} from '../shared/data.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SocketService} from '../shared/socket.service';
// @ts-ignore
import * as io from 'socket.io-client';
import {map} from 'rxjs/operators';

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
  readonly colorScheme = {
    domain: ['#CFC0BB', '#5AA454', '#E44D25', '#25D4E4']
  };
  readonly gaugeDimensions: [number, number] = [765, 400];
  readonly verticalBarDimensions: [number, number] = [170, 400];
  readonly yAxisLabel = 'signal';
  bitcoinPrice: number | undefined;
  readonly currencies: any[] = [
    {name: 'ADA', value: 0},
    {name: 'BNB', value: 0},
    {name: 'BCH', value: 0},
    {name: 'BTC', value: 0},
    {name: 'LTC', value: 0},
    {name: 'ETH', value: 0},
    {name: 'XRP', value: 0},
    {name: 'LINK', value: 0},
    {name: 'EOS', value: 0}
  ];
  currentCurrency: string | undefined;

  // States:
  lampsState: any;
  verticalBarState: any =  [
    {
      name: 'Signal',
      series:
        [
            // {
            //   name: 'hold',
            //   value: 1
            // },
            // {
            //   name: 'buy',
            //   value: 1
            // },
            // {
            //   name: 'sell',
            //   value: 1
            // }
          ]
        }
      ];
  gaugeState: any = [
    {
      name: 'UK',
      value: 180
    },
  ];


  constructor(private readonly dataService: DataService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly socketService: SocketService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((paramsMap: any) => paramsMap.params.currency))
      .subscribe(currentCurrency => this.currentCurrency = currentCurrency);

    this.onSocketConnections();
  }

  private onSocketConnections(): void {
    this.socket.on('futuresLastPrice', (msg: any) => {
      // console.log('futures: ', msg);
    });

    this.socket.on('lampSignal', (lampSignal: any) => {
      if (lampSignal.split('^^')[0].replace('USDT', '') === this.currentCurrency) {
        console.log(lampSignal.split('^^')[1].split('@'));
        this.verticalBarState[0].series = [...[]];
        switch (lampSignal.split('^^')[1].split('@')[0]) {
          case 'NOT':
            // @ts-ignore
            this.verticalBarState[0].series = [...this.verticalBarState[0].series,
              // {name: 'nothing', value: 1},
              ...[{name: 'hold', value: 1}],
              ];
            break;

          case 'BUY':
            // @ts-ignore
            this.verticalBarState[0].series = [...this.verticalBarState[0].series,
              // {name: 'nothing', value: 1},
              ...[{name: 'hold', value: 1},
              {name: 'buy', value: 1}]
              ];
            break;

          case 'SELL':
            // @ts-ignore
            this.verticalBarState[0].series = [...this.verticalBarState[0].series,
              // {name: 'nothing', value: 1},
              ...[{name: 'hold', value: 1},
              {name: 'buy', value: 1},
              {name: 'sell', value: 1}]
              ];
            break;
          // case '4':
          //   this.verticalBarState[0].series = [];
          //   break;
        }
        this.lampsState = lampSignal.split(/[@@]/)[1].split('');
        this.gaugeState = [
          {name: this.currentCurrency,
            value: lampSignal.split('^^')[1].split('@')[2]}
          ];
      }
    });

    this.socket.on('updateBitcoinChange', (bitcoinPrice: any) => {
      this.currencies[3].value = bitcoinPrice;
    });

    // TODO: Don't implement this yet:
    // this.socket.on('updateMarketPrice', (msg: any) => {
    //   console.log('market: ', msg);
    // });
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

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sidenavSubscription?.unsubscribe();
  }

}
