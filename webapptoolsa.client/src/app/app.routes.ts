import { Routes } from "@angular/router";
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
      { path: 'dashboard', loadComponent: () => import('./component/dashboard/dashboard.component').then(m => m.DashboardComponent)}, 
      { path: 'company', loadComponent: () => import('./component/cp-company/company/company.component').then(m => m.CompanyComponent) },
      { path: 'warehouse', loadComponent: () => import('./component/cp-warehouse/warehouse/warehouse.component').then(m => m.WarehouseComponent) },
      { path: 'category', loadComponent: () => import('./component/cp-category/category/category.component').then(m => m.CategoryComponent) },
      { path: 'conditional', loadComponent: () => import('./component/cp-conditionalTools/conditionaltools/conditionaltools.component').then(m => m.ConditionaltoolsComponent) },
      { path: 'tools', loadComponent: () => import('./component/cp-tools/tools/tools.component').then(m => m.ToolsComponent) },
      { path: 'typetransaction', loadComponent: () => import('./component/cp-type-transaction/type-transaction/type-transaction.component').then(m => m.TypeTransactionComponent) },
      { path: 'transaction', loadComponent: () => import('./component/cp-transaction/transaction-upsert/transaction-upsert.component').then(m => m.TransactionUpsertComponent)},
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
