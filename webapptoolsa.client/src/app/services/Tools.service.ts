import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, ConditionalTools, Tools, ToolsDto } from "../models/Tools";
import { catchError, Observable, shareReplay, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToolsServices {

    private categories$: Observable<Category[]>;
    private status$: Observable<ConditionalTools[]>;
    private tools$: Observable<Tools[]>;

    constructor(private http: HttpClient) {
        this.categories$ = this.http.get<Category[]>(`${environment.apiUrl}/tools/category`).pipe( catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }),shareReplay({ bufferSize: 1, windowTime: 5 * 60 * 1000, refCount: true }));
        this.status$ = this.http.get<ConditionalTools[]>(`${environment.apiUrl}/tools/status`).pipe( catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }),shareReplay({ bufferSize: 1, windowTime: 5 * 60 * 1000, refCount: true }));
        this.tools$ = this.http.get<Tools[]>(`${environment.apiUrl}/tools`).pipe( catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }),shareReplay({ bufferSize: 1, windowTime: 5 * 60 * 1000, refCount: true }));
    }

    getCategory(): Observable<Category[]> {
        return this.categories$;
    }

    getStatus(): Observable<ConditionalTools[]> {
        return this.status$;
    }

    getTools(): Observable<Tools[]> {
        return this.tools$;
    }


    createCategory(info: Partial<Category>) {
        return this.http.post<Category>(`${environment.apiUrl}/tools/category`, info).pipe(
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

    updateCategory(info: Partial<Category>) {
        return this.http.put<Category>(`${environment.apiUrl}/tools/category/${info.id}`, info).pipe(
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

    createConditional(info: Partial<ConditionalTools>) {
        return this.http.post<ConditionalTools>(`${environment.apiUrl}/tools/status`, info).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }));;
    }

    updateConditional(info: Partial<ConditionalTools>) {
        return this.http.put<ConditionalTools>(`${environment.apiUrl}/tools/status/${info.id}`,info).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }));;
    }

    createTools(info: Partial<ToolsDto>) {
        return this.http.post<Tools>(`${environment.apiUrl}/tools`, info).pipe(
      catchError((error: any) => {
        let message = "Unexpected error occurred";

        if (error.error?.message) {
          message = error.error.message;
        }

        else if (error.error?.errors) {
          message = Object.values(error.error.errors).join(', ');
        }

        return throwError(() => message);
      }));;
    }

    updateTools(info:Partial<ToolsDto>) {
        return this.http.put<Tools>(`${environment.apiUrl}/tools/${info.id}`,info).pipe(
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
