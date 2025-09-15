import { AfterViewInit, Component, DestroyRef, inject,  ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionService } from '../../../services/Transaction.service';
import { TransactionHeaderDto } from '../../../models/Transaction';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionUpsertComponent } from '../transaction-upsert/transaction-upsert.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _destroyRef = inject(DestroyRef);
  private _typeTransactionService = inject(TransactionService)
  private readonly _dialog = inject(MatDialog);


  data!: MatTableDataSource<TransactionHeaderDto>;
  dataNameColumns: string[] = ['id', 'nameTypeTransaction','days', 'notes', 'usernameRegister', 'usernameRecipt', 'nameProject', 'warehouseOrigin', 'warehouseDestination', ' createdAt','status','action']

  ngAfterViewInit(): void {
    this._typeTransactionService.getAllTransaction().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data) => {
        this.data = new MatTableDataSource(data);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      },
      error: (error) => console.log("error in load type transaction", error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  new() {
    const tmpdialog = this._dialog.open(TransactionUpsertComponent);
   
  }

  edit(obj: Partial<TransactionHeaderDto>) {
    
  }
}
