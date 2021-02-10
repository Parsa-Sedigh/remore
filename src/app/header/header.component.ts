import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Subscription} from 'rxjs';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidenavOpen = false;
  sidenavSubscription: Subscription | undefined;
  @ViewChild('themeToggle') themeToggle: ElementRef<MatSlideToggle> | undefined;
  isThemeToggleChecked = false;

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

  onToggleTheme() {
    this.isThemeToggleChecked = !this.isThemeToggleChecked;
  }


  ngOnDestroy() {
    this.sidenavSubscription?.unsubscribe();
  }
}
