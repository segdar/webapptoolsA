import { Injectable } from "@angular/core";
import { TransactionHeaderBase, TransactionHeaderDto, TypeTransaction } from "../models/Transaction";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private typeTransaction$: Observable<TypeTransaction[]>

  constructor(private http: HttpClient) {
    this.typeTransaction$ = this.http.get<TypeTransaction[]>(`${environment.apiUrl}/transaction/types`);

  }

  getTypeTransactionAll() {
    return this.typeTransaction$;
  }

  createTypeTransaction(info: TypeTransaction) {
    return this.http.post(`${environment.apiUrl}/transaction/types`, info)
      .pipe(
        catchError((error: any) => {
          let message = "Unexpected error occurred";

          if (error.error?.message) {
            message = error.error.message;
          }

          else if (error.error?.errors) {
            message = Object.values(error.error.errors).join(', ');
          }

          return throwError(() => message);
        }));
  }

  updateTypeTransaction(info: TypeTransaction) {
    return this.http.put(`${environment.apiUrl}/transaction/types/${info.id}`, info).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }));
  }

  removeTypeTransaction(id: number) {
    return this.http.delete(`${environment.apiUrl}/transaction/type/${id}`).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }
      ))
  }


  getAllTransaction() {
    return this.http.get <TransactionHeaderDto[]>(`/transaction`);
  }

  createTransactionHeader(info: TransactionHeaderBase) {
    return this.http.post(`${environment.apiUrl}/transaction`, info);
  }

  updateTransactionHeader(info: TransactionHeaderBase) {
    return this.http.put(`${environment.apiUrl}/transaction/${info.id}`, info);
  }

}
