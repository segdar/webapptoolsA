import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TransactionService } from '../../../services/Transaction.service';
import { TypeTransaction } from '../../../models/Transaction';
import { Warehouse } from '../../../models/Warehouse';

@Component({
  selector: 'app-transaction-upsert',
  standalone: true,
  imports: [],
  templateUrl: './transaction-upsert.component.html',
  styleUrl: './transaction-upsert.component.css'
})
export class TransactionUpsertComponent {

  
  private _destroyRef = inject(DestroyRef);
  private _typeTransactionService = inject(TransactionService)

  lstTypeTransaction = signal<TypeTransaction[]>([]);
  lstWarehouse = signal<Warehouse[]>([]);
}
