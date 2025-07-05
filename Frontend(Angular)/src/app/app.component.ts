import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public static readonly title = 'DAC-EmpresaAerea-Frontend';
  public static readonly PUBLIC_BACKEND_URL = 'http://localhost:3000';
  isLoading = true;

  private publicRoutes = ['', 'login', 'cadastro'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('App initializing');
    
    try {
      const currentRoute = this.router.url.split('/')[1]; 
      const isPublicRoute = this.publicRoutes.includes(currentRoute);
      const isAuthenticated = this.authService.isAuthenticated();
      
      console.log('Route check:', { 
        currentRoute,
        isPublicRoute,
        isAuthenticated 
      });
      if (isPublicRoute) {
        this.isLoading = false;
        return;
      }
      if (!isAuthenticated) {
        console.log('Not authenticated on protected route, navigating to login');
        this.router.navigate(['/login']);
        return;
      }
      const user = this.authService.getUser();
      
      if (!user) {
        console.log('No user data found, navigating to login');
        this.router.navigate(['/login']);
        return;
      }

      console.log('User data:', { 
        perfil: user.perfil, 
        id: user.id 
      });
      this.authService.setUser(user);
      switch (user.perfil?.toLowerCase()) {
        case 'cliente':
          console.log('Navigating to cliente dashboard');
          this.router.navigate(['/cliente']);
          break;
        case 'funcionario':
          console.log('Navigating to funcionario dashboard');
          this.router.navigate(['/funcionario']);
          break;
        default:
          console.log('Unknown user type, navigating to home');
          this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      this.router.navigate(['/login']);
    } finally {
      this.isLoading = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']);
      }
    });
  }
}