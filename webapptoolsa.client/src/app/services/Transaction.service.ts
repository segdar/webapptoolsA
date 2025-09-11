import { Injectable } from "@angular/core";
import { TypeTransaction } from "../models/Transaction";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private typeTransaction$:Observable<TypeTransaction[]>

    constructor(private http: HttpClient) {
        this.typeTransaction$ = this.http.get<TypeTransaction[]>('/transaction/types');
        
    }

    getTypeTransactionAll ( ){
        return this.typeTransaction$;
    }

    createTypeTransaction(info:TypeTransaction) {
        return this.http.post('/transaction/types',info)
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

    updateTypeTransaction(info:TypeTransaction) {
        return this.http.put('/transaction/types',info).pipe(
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

}