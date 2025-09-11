import { AfterViewInit, Component, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Warehouse } from '../../../models/Warehouse';
import { Subject, takeUntil } from 'rxjs';
import { WarehouseService } from '../../../services/Warehouse.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnDestroy,AfterViewInit{
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

   
    private _destroySubcription = new Subject<void>();
    private _warehouseService = inject(WarehouseService)
    
    data!:MatTableDataSource<Warehouse>;
    lstdataWarehouse = signal<Partial<Warehouse>[]>([])
    dataNameColumns: string[] = ["id", "name", "description","location","action"]
    objWarehouse:Partial<Warehouse>={
      name:'',
      location:'',
      description:'',
      companyId: 1,
      isActived:true
    }


    ngAfterViewInit(): void {
    this._warehouseService.getAll().pipe(takeUntil(this._destroySubcription)).subscribe({
          next: (data:Warehouse[]) => {
            this.data = new MatTableDataSource(data);
             this.data.paginator = this.paginator;
              this.data.sort = this.sort;
              this.lstdataWarehouse.set(data.filter(i => i.warehouseFatherId === null));
          },
          error: (error:unknown) => console.log("erro in all data warehouse", error)
        });
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  addWarehouse() {
   
    this._warehouseService.create(this.objWarehouse).pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data:unknown) => {
        const tmpdata = data as Warehouse;
        this.data.data.push(tmpdata);
        this.data._updateChangeSubscription();
        this.objWarehouse = {};
      },
      error: (error) => console.log("Error in create new warehouse")
    })
  }

  edit(obj:Partial<Warehouse>){
    this.objWarehouse = obj;
  }

  ngOnDestroy(): void {
    this._destroySubcription.next();
    this._destroySubcription.complete();
  }
}
