import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TypeTransaction } from '../../../models/Transaction';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../../services/Transaction.service';
import { Subject, takeUntil } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-type-transaction-upsert-component',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './type-transaction-upsert-component.component.html',
  styleUrl: './type-transaction-upsert-component.component.css'
})
export class TypeTransactionUpsertComponentComponent implements OnDestroy {
  objTypeTransaction: Partial<TypeTransaction> = {}
  isnew = true;
  private _typeTransactionService = inject(TransactionService)
  private _destroySubcription = new Subject<void>();
  private _snackBar = inject(MatSnackBar);
   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private dialogRef: MatDialogRef<TypeTransactionUpsertComponentComponent>
  ) {
    if(data) {
      this.objTypeTransaction = data;
      this.isnew=false;
    }
    

  }

  
  

  saveTypes() {
    if(!this.isnew) {
      this._typeTransactionService.updateTypeTransaction(this.objTypeTransaction as TypeTransaction).pipe(takeUntil(this._destroySubcription)).subscribe({
        next:(data) => {
          console.log(data)
        },
        error: (error) => console.log(error)
      })
    }else {
      this._typeTransactionService.createTypeTransaction(this.objTypeTransaction as TypeTransaction).pipe(takeUntil(this._destroySubcription)).subscribe({
        next: (data) => {
          console.log("data",data);
        },
         error: (error) =>{
           this._snackBar.open("Error: " + error, "Close", { duration: 1000 });
         }
      })
    }
    
  }

    ngOnDestroy(): void {
    this._destroySubcription.next();
    this._destroySubcription.complete();
  }
  
}
