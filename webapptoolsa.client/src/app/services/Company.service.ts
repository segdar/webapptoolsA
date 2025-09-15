import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CompanyDto } from "../models/Company";

@Injectable({
  "providedIn": "root"
})
export class CompanyService {
  private baseUrl = '/api/company'; 
  constructor(private http: HttpClient) {

  }

  getAll():Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>('/company').pipe(
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

    create(info:Partial<CompanyDto>) {
          return this.http.post<CompanyDto>('/company',info).pipe(
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

  update(info: Partial<CompanyDto>) {
    return this.http.put<CompanyDto>(`/company/${info.id}`,info).pipe(
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
