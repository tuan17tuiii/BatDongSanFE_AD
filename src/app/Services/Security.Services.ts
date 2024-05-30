import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class SecurityServices {
    constructor(private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        let roles: string = next.data['role'];

        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            const username = sessionStorage.getItem('username');
            const role = sessionStorage.getItem('role');

            if (!username || role != roles) {
                this.router.navigate(['Login']);
                return false;
            }
          }

        return true;
    }
}

export const AdminSecurity: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(SecurityServices).canActivate(next, state);
}