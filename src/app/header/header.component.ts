import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidenavOpen = false;
  sidenavSubscription: Subscription | undefined;

  constructor(private readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.currentSidenav
      .subscribe(sidenavState => {
        this.isSidenavOpen = sidenavState;
      });
  }

  onToggleSideNav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.dataService.changeSidenav(this.isSidenavOpen);
  }

  ngOnDestroy() {
    this.sidenavSubscription?.unsubscribe();
  }
}
