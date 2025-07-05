import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      console.log('User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
    const currentUser = this.authService.getUser();
    
    if (!currentUser) {
      console.log('No user object found, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
    const requiredRole = route.data['role']?.toLowerCase();
    const userRole = currentUser.perfil?.toLowerCase();

    console.log('Checking roles:', {
      required: requiredRole,
      user: userRole
    });

    if (!requiredRole) {
      return true;
    }

    if (userRole === requiredRole) {
      return true;
    }

    console.log('Role mismatch, redirecting to appropriate dashboard');
    if (userRole === 'cliente') {
      this.router.navigate(['/cliente']);
    } else if (userRole === 'funcionario') {
      this.router.navigate(['/funcionario']);
    } else {
      this.router.navigate(['/']);
    }

    return false;
  }
}