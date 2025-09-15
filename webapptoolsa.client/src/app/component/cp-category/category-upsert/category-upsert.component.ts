import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseUpsertComponent } from '../../abstract/BaseUpsertComponent';
import { Category } from '../../../models/Tools';
import { Observable } from 'rxjs';
import { commonModel } from '../../../models/Common';
import { ToolsServices } from '../../../services/Tools.service';


@Component({
  selector: 'app-category-upsert',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './category-upsert.component.html',
  styleUrl: './category-upsert.component.css'
})
export class CategoryUpsertComponent extends BaseUpsertComponent<Category> {
  private _toolservice = inject(ToolsServices);
  
  constructor(@Inject(MAT_DIALOG_DATA) data: Category,
      dialogRef: MatDialogRef<CategoryUpsertComponent>) {
        super(dialogRef,data);

  }
  create(item: commonModel): Observable<commonModel> {
   return this._toolservice.createCategory(item);
  }
 update(item: commonModel): Observable<commonModel> {
    return this._toolservice.updateCategory(item);
  }

  isValid(obj: Partial<commonModel>): boolean {
   return !!this.obj.name;
  }

}
