import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "../models/Company";

@Injectable({
  "providedIn": "root"
})
export class CompanyService {
  private baseUrl = '/api/company'; 
  constructor(private http: HttpClient) {

  }

  getAll():Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>('/company');
  }

    create(info:Partial<CompanyDto>) {
          return this.http.post('/company',info);
    }

  
                    
}
