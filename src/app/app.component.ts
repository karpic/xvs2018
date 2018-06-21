import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;

  constructor(
    private router: Router
  ){
    router.events.subscribe(
      (routerEvent: Event) =>{
        this.checkRouterEvent(routerEvent);
      }
    );
  }

  checkRouterEvent(routerEvent: Event): void {
    if(routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if(routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.loading = false;
      }
  }
}
