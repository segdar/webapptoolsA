import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, ConditionalTools, Tools } from "../models/Tools";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToolsServices {

    constructor(private http: HttpClient) {
        
      }

    getCategory():Observable<Category[]> {
        return this.http.get<Category[]>('/tools/category').pipe(shareReplay({ bufferSize: 1,windowTime:5 * 60 * 1000,  refCount: true }));
    }

    getStatus():Observable<ConditionalTools[]> {
        return this.http.get<ConditionalTools[]>('/tools/status').pipe(shareReplay({ bufferSize: 1,windowTime:5 * 60 * 1000,  refCount: true }));
    }

    getTools():Observable<Tools[]> {
        return this.http.get<Tools[]>('/tools')
    }

    
    createCategory(info:Partial<Category>) {
              return this.http.post('/tools/category',info);
    }
     createConditional(info:Partial<ConditionalTools>) {
              return this.http.post('/tools/status',info);
    }

    createTools(info:Partial<Tools>) {
              return this.http.post('/tools',info);
    }
}