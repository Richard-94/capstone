import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Data-Services/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authServ.checkLoginStatus();

    if (isLoggedIn && this.authServ.currentUser && this.authServ.currentUser.roles.includes('ROLE_ADMIN')) {
      console.log("sono admin");
      return true;
    } else {
      console.log("buttato fuori");
      this.router.navigate(['/no-access']);
      return false;
    }
  }
}


