import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidenavOpen = false;

  constructor(private readonly dataService: DataService) {
  }

  ngOnInit(): void {
  }

  onToggleSideNav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.dataService.changeSidenav(this.isSidenavOpen);
  }

}
