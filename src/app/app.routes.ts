import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LaptopComponent } from './features/laptop/laptop.component';
import { UserManagementComponent } from './features/usermanagement/usermanagement.component';
import { DesktopComponent } from './features/desktop/desktop.component';
import { ServerComponent } from './features/server/server.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard - Laptop Inventory'} },
      { path: 'laptop', component: LaptopComponent, data: {title: 'Laptop - Laptop Inventory'} },
      { path: 'user-management', component: UserManagementComponent, data: {title: 'Employees - Laptop Inventory'}  },
      { path: 'desktop', component: DesktopComponent, data: {title: 'Desktop - Laptop Inventory'}  },
      { path: 'server', component: ServerComponent, data: {title: 'Server - Laptop Inventory'}  },
    ],
  },
];


