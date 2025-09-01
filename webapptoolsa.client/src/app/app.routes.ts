import { Routes } from "@angular/router";
import { CompanyComponent } from "./component/company/company.component";



export const routes: Routes = [
  { path: '', component: CompanyComponent },
  {  path: 'warehouse',
    loadComponent: () =>
      import('./component/warehouse/warehouse.component').then(
        (m) => m.WarehouseComponent
      ),},

    {  path: 'category',
    loadComponent: () =>
      import('./component/category/category.component').then(
        (m) => m.CategoryComponent
      ),},
        {  path: 'conditional',
    loadComponent: () =>
      import('./component/conditionaltools/conditionaltools.component').then(
        (m) => m.ConditionaltoolsComponent
      ),},
        {  path: 'tools',
    loadComponent: () =>
      import('./component/tools/tools.component').then(
        (m) => m.ToolsComponent
      ),},
      
];
