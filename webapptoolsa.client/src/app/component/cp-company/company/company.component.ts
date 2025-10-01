
import { AfterViewInit, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { CompanyService } from '../../../services/Company.service';
import { CompanyDto } from '../../../models/Company';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompanyUpsertComponent } from '../company-upsert/company-upsert.component';
import { BaseCrudTableComponent } from '../../abstract/BaseCrudTableComponent';
import { MatInputModule } from '@angular/material/input';
import { PermissionService } from '../../../services/PermissionService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  
})
export class CompanyComponent extends BaseCrudTableComponent<CompanyDto>  {

  private _companyService = inject(CompanyService)
  permissionService = inject(PermissionService);

  displayedColumns: string[] = ["id", "name", "address", "contactInfo", "action"];
  

  

  getAll() {
    return this._companyService.getAll();
  }

  openDialog(entity?: Partial<CompanyDto> | undefined) {
    return this.dialog.open(CompanyUpsertComponent, {
      data:{...entity},
    });
  }

  

  
}
