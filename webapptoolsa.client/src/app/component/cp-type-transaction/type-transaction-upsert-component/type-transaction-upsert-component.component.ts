import { Component, DestroyRef, inject, Inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TypeTransaction } from '../../../models/Transaction';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../../services/Transaction.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-type-transaction-upsert-component',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './type-transaction-upsert-component.component.html',
  styleUrl: './type-transaction-upsert-component.component.css'
})
export class TypeTransactionUpsertComponentComponent  {
  objTypeTransaction: Partial<TypeTransaction> = {}
  isnew = true;
  private _typeTransactionService = inject(TransactionService)
  private _destroyRef = inject(DestroyRef);

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private dialogRef: MatDialogRef<TypeTransactionUpsertComponentComponent>
  ) {
    if(data) {
      this.objTypeTransaction = data;
      this.isnew=false;
    }
    

  }

  
  isValid(obj: Partial<TypeTransaction>): boolean {
    return !!obj.code && !!obj.name && !!obj.type;
  }

  saveTypes() {
    if(!this.isnew) {
      this._typeTransactionService.updateTypeTransaction(this.objTypeTransaction as TypeTransaction).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next:(data) => {
          this.dialogRef.close(data);
        },
        error: (error) => console.log(error)
      })
    }else {
      this._typeTransactionService.createTypeTransaction(this.objTypeTransaction as TypeTransaction).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (data) => {
          this.dialogRef.close(data);
        },
         error: (error) => console.log(error)
      })
    }
    
  }

   
  
}
