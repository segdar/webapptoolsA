import { Component, inject, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ToolsServices } from '../../../services/Tools.service';
import { ConditionalTools } from '../../../models/Tools';
import { BaseCrudTableComponent } from '../../abstract/BaseCrudTableComponent';
import { commonModel } from '../../../models/Common';
import { ConditionalToolsUpsertComponent } from '../conditional-tools-upsert/conditional-tools-upsert.component';

@Component({
  selector: 'app-conditionaltools',
  standalone: true,
  imports: [ MatTableModule,MatFormFieldModule,MatInputModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './conditionaltools.component.html',
  styleUrl: './conditionaltools.component.css'
})
export class ConditionaltoolsComponent extends BaseCrudTableComponent<ConditionalTools>{
  displayedColumns: string[] = ["id", "name", "isActived", "action"];
  
  private _toolsService = inject(ToolsServices)
  
  
  getAll() {
   return  this._toolsService.getStatus();
  }


   openDialog(entity?: Partial<commonModel> | undefined) {
    return this.dialog.open(ConditionalToolsUpsertComponent,{
      data: {...entity}
    })
  }
   

  
    
    
}
