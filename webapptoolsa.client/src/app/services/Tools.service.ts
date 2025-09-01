import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, ConditionalTools, Tools } from "../models/Tools";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToolsServices {

    constructor(private http: HttpClient) {
        
      }

    getCategory():Observable<Category[]> {
        return this.http.get<Category[]>('/tools/category');
    }

    getStatus():Observable<ConditionalTools[]> {
        return this.http.get<ConditionalTools[]>('/tools/status')
    }

    getTools():Observable<Tools[]> {
        return this.http.get<Tools[]>('/tools')
    }
}