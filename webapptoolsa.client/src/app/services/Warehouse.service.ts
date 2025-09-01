import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Warehouse } from "../models/Warehouse";

@Injectable({
  "providedIn": "root"
})
export class WarehouseService {
    constructor(private http: HttpClient) {
    
      }

      getAll():Observable<Warehouse[]> {
         return this.http.get<Warehouse[]>('/warehouse');
      }

      create(info:Partial<Warehouse>) {
        return this.http.post('/warehouse',info);
      }
}