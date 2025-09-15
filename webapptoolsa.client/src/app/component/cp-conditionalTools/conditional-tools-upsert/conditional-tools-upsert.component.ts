import { Component, Inject, inject } from '@angular/core';
import { BaseUpsertComponent } from '../../abstract/BaseUpsertComponent';
import { ConditionalTools } from '../../../models/Tools';
import { Observable } from 'rxjs';
import { commonModel } from '../../../models/Common';
import { ToolsServices } from '../../../services/Tools.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conditional-tools-upsert',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './conditional-tools-upsert.component.html',
  styleUrl: './conditional-tools-upsert.component.css'
})
export class ConditionalToolsUpsertComponent extends BaseUpsertComponent<ConditionalTools> {
  private _toolsService = inject(ToolsServices);
  
  constructor(@Inject(MAT_DIALOG_DATA) data: ConditionalTools,
      dialogRef: MatDialogRef<ConditionalToolsUpsertComponent>) {
    super(dialogRef,data);
  }


  create(item: commonModel): Observable<commonModel> {
    return this._toolsService.createConditional(item);
  }
  update(item: commonModel): Observable<commonModel> {
   return this._toolsService.updateConditional(item);
  }
  isValid(obj: Partial<commonModel>): boolean {
   return !!obj.name;
  }

}
