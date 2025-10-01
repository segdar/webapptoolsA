import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  catchError, Observable, shareReplay, throwError } from "rxjs";
import { Warehouse } from "../models/Warehouse";

@Injectable({
  "providedIn": "root"
})
export class WarehouseService {
    private warehouse:Observable<Warehouse[]>


    constructor(private http: HttpClient) {
      this.warehouse =  this.http.get<Warehouse[]>(`${environment.apiUrl}/warehouse`).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }),shareReplay({ bufferSize: 1,windowTime:5 * 60 * 1000,  refCount: true, }));
      }

      getAll():Observable<Warehouse[]> {
         return this.warehouse;
      }

      create(info:Partial<Warehouse>) {
        return this.http.post<Warehouse>(`${environment.apiUrl}/warehouse`,info).pipe(
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

      update(info:Partial<Warehouse>) {
        return this.http.put<Warehouse>(`${environment.apiUrl}/warehouse/${info.id}`,info).pipe(
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
