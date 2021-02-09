import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sidenavSource = new BehaviorSubject(false);
  currentSidenav = this.sidenavSource.asObservable();

  constructor() { }

  changeSidenav(isSidenavOpen: boolean): void {
    this.sidenavSource.next(isSidenavOpen);
  }
}
