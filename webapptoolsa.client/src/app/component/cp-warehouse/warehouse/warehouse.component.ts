import { Component, inject,} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Warehouse } from '../../../models/Warehouse';
import { WarehouseService } from '../../../services/Warehouse.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCrudTableComponent } from '../../abstract/BaseCrudTableComponent';
import { WarehouseUpsertComponent } from '../warehouse-upsert/warehouse-upsert.component';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent extends BaseCrudTableComponent<Warehouse> {
  displayedColumns: string[] = ["id", "name", "description", "location", "action"];

  private _warehouseService = inject(WarehouseService)

  getAll() {
    return this._warehouseService.getAll();
  }
  openDialog(entity?: Partial<Warehouse> | undefined) {
    return this.dialog.open(WarehouseUpsertComponent, {
      data: {...entity}
    })
  }
  
}
