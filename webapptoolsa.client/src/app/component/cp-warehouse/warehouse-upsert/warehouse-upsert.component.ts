import { Component, computed, inject, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseUpsertComponent } from '../../abstract/BaseUpsertComponent';
import { Warehouse } from '../../../models/Warehouse';
import { map, Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { WarehouseService } from '../../../services/Warehouse.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-warehouse-upsert',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './warehouse-upsert.component.html',
  styleUrl: './warehouse-upsert.component.css'
})
export class WarehouseUpsertComponent extends BaseUpsertComponent<Warehouse> implements OnInit  {
  private _warehouseService = inject(WarehouseService);
  lstdataWarehouse = signal<Warehouse[]>([]);

  constructor( @Inject(MAT_DIALOG_DATA) data: Warehouse,
      dialogRef: MatDialogRef<WarehouseUpsertComponent>) {
    super(dialogRef,data);
    
  
  }
  ngOnInit(): void {
    this._loadWarehouse();
  }

  private _loadWarehouse() {
      this._warehouseService.getAll().pipe(map(data => data.filter(i => i.warehouseFatherId ===null) ),takeUntilDestroyed(this._destroyRef)).subscribe({
        next: data => this.lstdataWarehouse.set(data),
        error: error => console.log("error in load")
      })
  }

  create(item: Warehouse): Observable<Warehouse> {
    return this._warehouseService.create(item);
  }


  update(item: Warehouse): Observable<Warehouse> {
    return this._warehouseService.update(item);
  }

  
   isValid(obj: Partial<Warehouse>): boolean {
   return !!obj.name && !!obj.description && !!obj.location
  }

}
