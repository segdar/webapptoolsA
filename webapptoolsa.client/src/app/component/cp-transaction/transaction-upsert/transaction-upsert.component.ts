import { Component, computed, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TransactionService } from '../../../services/Transaction.service';
import { TransactionDetailDisplayTable, TransactionHeaderBase, TransactionHeaderDto, TypeTransaction } from '../../../models/Transaction';
import { Warehouse } from '../../../models/Warehouse';
import { WarehouseService } from '../../../services/Warehouse.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AuthService } from '../../../services/Auth.service';
import { Tools } from '../../../models/Tools';
import { ToolsServices } from '../../../services/Tools.service';


@Component({
  selector: 'app-transaction-upsert',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatSelectModule, MatDatepickerModule, FormsModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule,],
  templateUrl: './transaction-upsert.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './transaction-upsert.component.css'
})
export class TransactionUpsertComponent implements OnInit{

  private _destroyRef = inject(DestroyRef);
  obj:Partial <TransactionHeaderDto> = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _TransactionService = inject(TransactionService)
  private _warehouseService = inject(WarehouseService);
  private _authService = inject(AuthService)
  private _toolsService = inject(ToolsServices);

  private _lstdataWarehouse = signal<Warehouse[]>([]);
  private _lstdataTypeTransaction = signal<TypeTransaction[]>([]);
  private _lstdataTypeTools = signal<Tools[]>([]);
  private _tmpWarehouse = computed(() => this._lstdataWarehouse());
  private _tmpType = computed(() => this._lstdataTypeTransaction());

  lstTmpWarehouseO = this._tmpWarehouse;
  lstTmpWarehouseD = this._tmpWarehouse;
  lstTmpTypeTransaction = this._tmpType;
  searchType = signal<string>("");
  searchWarehouseO = signal<string>("");
  searchWarehouseD = signal<string>("");
  data = new MatTableDataSource <TransactionDetailDisplayTable>([]);
  displayedColumns: string[] = [
    "idToolsType",
    "toolTypeName",
    "quantity"
    ];

  

  ngOnInit(): void {
    this._loadEndpoint();
  }

  private _loadEndpoint() {
    forkJoin({
      warehouse: this._warehouseService.getAll(),
      typeTransaction: this._TransactionService.getTypeTransactionAll(),
      typeTools : this._toolsService.getTools()
    }).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data) => {
        this._lstdataWarehouse.set(data.warehouse);
        this._lstdataTypeTransaction.set(data.typeTransaction);
        this._lstdataTypeTools.set(data.typeTools);
      },
      error: (error) => console.log("error load",error)
    })
  }

  filterTypeTransaction(value: string) {
    const filterValue = value.toLowerCase();
    this.lstTmpTypeTransaction = computed(() => this._tmpType().filter(c =>
      c.name.toLowerCase().includes(filterValue)
    ));
  }

  headerNew() {

    console.log("data",this._authService.getUserInfo())
    this.obj.userId = this._authService.getUserInfo()?.id;
    this.obj.status = 0;
    const tmp: TransactionHeaderBase = {
      id: null,
      userId: this.obj.userId ?? 0,
      dateStart: this.obj.dateStart ?? new Date(),
      dateEnd: this.obj.dateEnd ?? new Date(),
      days: null,
      notes: this.obj.notes ?? null,
      userRecipt: null,
      idProject: this.obj.idProject ?? null,
      idWarehouseOrigin: this.obj.idWarehouseOrigin ?? 0,
      idWarehouseDestination: this.obj.idWarehouseDestination ?? null,
      status: 0,
      createdAt: null,
      idType: this.obj.idType ?? 0
    }
    this._TransactionService.createTransactionHeader(tmp).subscribe({
      next: data => console.log("info save", data),
      error: error => console.log("error in save info", error),
      complete: () => console.log("comple info")
      
    });
  }

  headerApply() {
    console.log("apply header")
  }

  headerAbort() {
    console.log("abort header");
  }

  detailNew() {
    this.data.data = [
      ...this.data.data,
      { idToolsType: 0, toolTypeName: '',quantity: 0 }
    ];

  }

  detailEdit() {
        console.log("edit detail");
  }

  detailRemove() {
            console.log("remove detail");
  }

  isEditingRow(row: any): boolean {
    return true;
  }

  openListToolsType() {
      
  }


}
