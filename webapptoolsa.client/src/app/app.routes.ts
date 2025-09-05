import { Routes } from "@angular/router";
import { CompanyComponent } from "./component/company/company.component";
import { LoginComponent } from "./component/login/login.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { authGuard } from "./services/Auth.guard";



export const routes: Routes = [
  { path: '', component: LoginComponent},
  {
    path: '',
    canActivate: [authGuard],
    component: NavbarComponent, // layout wrapper with <router-outlet>
    children: [
      { path: 'company', loadComponent: () => import('./component/company/company.component').then(m => m.CompanyComponent) },
      { path: 'warehouse', loadComponent: () => import('./component/warehouse/warehouse.component').then(m => m.WarehouseComponent) },
      { path: 'category', loadComponent: () => import('./component/category/category.component').then(m => m.CategoryComponent) },
      { path: 'conditional', loadComponent: () => import('./component/conditionaltools/conditionaltools.component').then(m => m.ConditionaltoolsComponent) },
      { path: 'tools', loadComponent: () => import('./component/tools/tools.component').then(m => m.ToolsComponent) },
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
