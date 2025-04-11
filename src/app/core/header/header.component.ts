import { Component, HostListener } from '@angular/core';
import { FeaturesService } from '../../features/features.service'; // ✅ imported correctly
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  headerTitle = 'Laptop Inventory'; // Default title
  isMobile = window.innerWidth < 700;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 700;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private featuresService: FeaturesService // ✅ Injected service here
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title'] || 'Laptop Inventory';
        })
      )
      .subscribe(title => {
        this.headerTitle = title;
      });
  }

  logout() {
    this.featuresService.logout().subscribe({
      next: () => {
        sessionStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        alert('Logout failed');
      },
    });
  }
}
