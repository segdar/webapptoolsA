import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../services/Transaction.service';
import { TransactionHeaderDto, TypeTransaction } from '../../../models/Transaction';
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

@Component({
  selector: 'app-transaction-upsert',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatDatepickerModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './transaction-upsert.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './transaction-upsert.component.css'
})
export class TransactionUpsertComponent  implements OnInit{

  private _destroyRef = inject(DestroyRef);
  obj:Partial <TransactionHeaderDto> = {};
 

  private _typeTransactionService = inject(TransactionService)
  private _warehouseService = inject(WarehouseService);

  private _lstdataWarehouse = signal<Warehouse[]>([]);
  private _lstdataTypeTransaction = signal<TypeTransaction[]>([]);
  private _tmpWarehouse = computed(() => this._lstdataWarehouse());
  private _tmpType = computed(() => this._lstdataTypeTransaction());

  lstTmpWarehouseO = this._tmpWarehouse;
  lstTmpWarehouseD = this._tmpWarehouse;
  lstTmpTypeTransaction = this._tmpType;
  searchType = signal<string>("");
  searchWarehouseO = signal<string>("");
  searchWarehouseD = signal<string>("");


  ngOnInit(): void {
    this._loadEndpoint();
  }

  private _loadEndpoint() {
    forkJoin({
      warehouse: this._warehouseService.getAll(),
      typeTransaction: this._typeTransactionService.getTypeTransactionAll()
    }).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data) => {
        this._lstdataWarehouse.set(data.warehouse);
        this._lstdataTypeTransaction.set(data.typeTransaction);

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
    console.log("new header");
  }

  headerApply() {
    console.log("apply header")
  }

  headerAbort() {
    console.log("abort header");
  }

  detailNew() {
    console.log("new detail");

  }

  detailEdit() {
        console.log("edit detail");
  }

  detailRemove() {
            console.log("remove detail");
  }


}
