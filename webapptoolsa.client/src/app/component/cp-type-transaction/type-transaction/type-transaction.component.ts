import { AfterViewInit, Component, DestroyRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { TypeTransaction } from '../../../models/Transaction';
import { TransactionService } from '../../../services/Transaction.service';
import {MatDialog} from '@angular/material/dialog';
import { TypeTransactionUpsertComponentComponent } from '../type-transaction-upsert-component/type-transaction-upsert-component.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-type-transaction',
  standalone: true,
  imports: [  MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './type-transaction.component.html',
  styleUrl: './type-transaction.component.css'
})
export class TypeTransactionComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroyRef = inject(DestroyRef);
  private _typeTransactionService = inject(TransactionService)
  private readonly _dialog =inject(  MatDialog);

  data!: MatTableDataSource<TypeTransaction>;
  dataNameColumns: string[] = ['id', 'code', 'name', 'type', 'isActived', 'action']
  
 

  ngAfterViewInit(): void {
    this._typeTransactionService.getTypeTransactionAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
    const tmpdialog =  this._dialog.open(TypeTransactionUpsertComponentComponent);
    tmpdialog.afterClosed().pipe(filter(data => data != null &&
      typeof data.name === "string" &&
      data.name.trim() !== ""),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
          this.data.data = [...this.data.data, data];
      },
      error: (error) => console.log(error)
    })
  }

  edit(obj: Partial<TypeTransaction>) {
   const tmpdialog = this._dialog.open(TypeTransactionUpsertComponentComponent,{
      data: {...obj}
    })
    tmpdialog.afterClosed().pipe(filter(data => data != null &&
      typeof data.name === "string" &&
      data.name.trim() !== ""),takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        const index = this.data.data.findIndex(x => x.id === data.id);
        if (index >= 0) {
          this.data.data[index] = data;
          this.data.data = [...this.data.data]; 
        }
         
      },
      error: (error) => console.log(error)
    })
  }

  remove(id: number) {

    this._typeTransactionService.removeTypeTransaction(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        
        this.data.data = this.data.data.filter(item => item.id !== id);
      },
      error: (error) => console.log(error)
    })

  }

  

}
