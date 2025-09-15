import { Component, inject,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';
import { ToolsServices } from '../../../services/Tools.service';
import { Category } from '../../../models/Tools';
import { CommonModule } from '@angular/common';
import { BaseCrudTableComponent } from '../../abstract/BaseCrudTableComponent';
import { CategoryUpsertComponent } from '../category-upsert/category-upsert.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent extends BaseCrudTableComponent<Category>{
   displayedColumns: string[]=["id", "name", "isActived", "action"]


  private _toolsService = inject(ToolsServices)

  
 getAll() {
    return this._toolsService.getCategory()
  }

 openDialog(entity?: Partial<Category> | undefined) {
    return this.dialog.open(CategoryUpsertComponent,{
      data:{...entity}
    })
  }
  

}
