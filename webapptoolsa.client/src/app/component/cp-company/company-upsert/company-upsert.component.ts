import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyDto } from '../../../models/Company';
import { CompanyService } from '../../../services/Company.service';
import { BaseUpsertComponent } from '../../abstract/BaseUpsertComponent';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-company-upsert',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './company-upsert.component.html',
  styleUrl: './company-upsert.component.css'
})
export class CompanyUpsertComponent extends BaseUpsertComponent<CompanyDto> {

  private _companyService = inject(CompanyService)

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    dialogRef: MatDialogRef<CompanyUpsertComponent>) {
    super(dialogRef, data);
  }


  create(item: CompanyDto): Observable<CompanyDto> {
    return this._companyService.create(item);
  }

  update(item: CompanyDto): Observable<CompanyDto> {
    return this._companyService.update(item);
  }

  isValid(obj: Partial<CompanyDto>): boolean {
    return !!obj.name && !!obj.name && !!obj.address;
  }
}
