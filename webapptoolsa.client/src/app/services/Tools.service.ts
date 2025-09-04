import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, ConditionalTools, Tools } from "../models/Tools";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToolsServices {

    private categories$: Observable<Category[]>;
    private status$: Observable<ConditionalTools[]>;
    private tools$ :Observable<Tools[]>;  

    constructor(private http: HttpClient) {
        this.categories$ = this.http.get<Category[]>('/tools/category').pipe(shareReplay({ bufferSize: 1,windowTime:5 * 60 * 1000,  refCount: true }));
        this.status$ = this.http.get<ConditionalTools[]>('/tools/status').pipe(shareReplay({ bufferSize: 1,windowTime:5 * 60 * 1000,  refCount: true }));
        this.tools$ = this.http.get<Tools[]>('/tools').pipe(shareReplay({ bufferSize: 1, windowTime: 5 * 60 * 1000, refCount: true })); 
      }

    getCategory():Observable<Category[]> {
        return this.categories$;
    }

    getStatus():Observable<ConditionalTools[]> {
        return this.status$;
    }

    getTools():Observable<Tools[]> {
        return this.tools$;
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