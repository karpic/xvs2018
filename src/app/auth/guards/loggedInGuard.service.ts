import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


const TOKEN_KEY = 'AuthToken';


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem(TOKEN_KEY)!==null){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
