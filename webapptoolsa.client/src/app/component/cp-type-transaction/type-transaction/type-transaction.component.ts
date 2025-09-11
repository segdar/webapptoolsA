import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, take, takeUntil } from 'rxjs';
import { TypeTransaction } from '../../../models/Transaction';
import { TransactionService } from '../../../services/Transaction.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TypeTransactionUpsertComponentComponent } from '../type-transaction-upsert-component/type-transaction-upsert-component.component';

@Component({
  selector: 'app-type-transaction',
  standalone: true,
  imports: [  MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './type-transaction.component.html',
  styleUrl: './type-transaction.component.css'
})
export class TypeTransactionComponent implements OnDestroy,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _destroySubcription = new Subject<void>();
  private _typeTransactionService = inject(TransactionService)
  private readonly _dialog =inject(  MatDialog);

  data!: MatTableDataSource<TypeTransaction>;
  dataNameColumns: string[] = ['id', 'code', 'name', 'type', 'isActived', 'action']
  
 

  ngAfterViewInit(): void {
   this._typeTransactionService.getTypeTransactionAll().subscribe({
    next:(data) => {
       this.data = new MatTableDataSource(data);
       this.data.paginator = this.paginator;
       this.data.sort = this.sort;
    },
    error:(error)=> console.log("error in load type transaction",error)
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
    this._dialog.open(TypeTransactionUpsertComponentComponent);
    this._dialog.afterAllClosed.pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data) => {
            console.log("data",data)
      },
      error: (error) => console.log(error)
    })
  }

  edit(obj: Partial<TypeTransaction>) {
    this._dialog.open(TypeTransactionUpsertComponentComponent,{
      data: obj
    })
    this._dialog.afterAllClosed.pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data) => {
            console.log("data",data)
      },
      error: (error) => console.log(error)
    })
  }

  

  ngOnDestroy(): void {
    this._destroySubcription.next();
    this._destroySubcription.complete();
  }

}
