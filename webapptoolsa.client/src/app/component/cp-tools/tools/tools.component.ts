import { Component, inject, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';
import { ToolsServices } from '../../../services/Tools.service';
import { Tools} from '../../../models/Tools';
import { BaseCrudTableComponent } from '../../abstract/BaseCrudTableComponent';
import { ToolsUpsertComponent } from '../tools-upsert/tools-upsert.component';


@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent extends BaseCrudTableComponent<Tools> {
  displayedColumns: string[] = ['id', 'name', 'description', 'location', 'provider', 'barcode', 'qr', 'cost', 'objcategory', 'statustools', 'isActived','action']

  private _toolsService = inject(ToolsServices);


  getAll() {
    return this._toolsService.getTools();
  }
  openDialog(entity?: Partial<Tools> | undefined) {
    return this.dialog.open(ToolsUpsertComponent, {
      data: { ...entity }
    })
  }

  

}
