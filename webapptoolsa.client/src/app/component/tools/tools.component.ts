import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ToolsServices } from '../../services/Tools.service';
import { Category, ConditionalTools, Tools, ToolsDto } from '../../models/Tools';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent implements OnInit{
  
   @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    
    
      private _destroySubcription = new Subject<void>();
      private _toolsService = inject(ToolsServices)

      data!: MatTableDataSource<Tools>;
      dataNameColumns: string[] = ['id', 'name', 'description', 'location', 'provider', 'barcode', 'qr', 'cost', 'objcategory', 'statustools', 'isActived']
      objTools :Partial<ToolsDto>={}
      lstdataCategory = signal<Category[]>([]);
      lstdataConditional = signal<ConditionalTools[]>([]);
      ngOnInit(): void {
    this.loadEndpoint();
  }
      ngAfterViewInit(): void {
        this._toolsService.getTools().pipe(takeUntil(this._destroySubcription)).subscribe({
          next: (data:Tools[]) => {
              this.data = new MatTableDataSource(data);
                 this.data.paginator = this.paginator;
                  this.data.sort = this.sort;
          },
           error: (error:unknown) => console.log("erro in all data tools", error)
        })
      }
      
      private loadEndpoint() {
         this._toolsService.getCategory().pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data:Category[]) => {
          this.lstdataCategory.set(data);
      },
       error: (error:unknown) => console.log("erro in all data category", error)
    })


     this._toolsService.getStatus().pipe(takeUntil(this._destroySubcription)).subscribe({
        next: (data:ConditionalTools[]) => {
            this.lstdataConditional.set(data);
             
        },
         error: (error:unknown) => console.log("erro in all data conditional", error)
      })
      }
       applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    
        if (this.data.paginator) {
          this.data.paginator.firstPage();
        }
      }


      addTools() {
           
            this._toolsService.createTools(this.objTools).pipe(takeUntil(this._destroySubcription)).subscribe({
              next: (data:unknown) => {
                const tmpdata = data as Tools;
                this.data.data.push(tmpdata);
                this.data._updateChangeSubscription();
                this.objTools= {};
              },
              error: (error) => console.log("Error in create new warehouse")
            })
          }
  
    
        edit(obj:Partial<ToolsDto>){
        this.objTools = obj;
      }
    
    
      
      ngOnDestroy(): void {
        this._destroySubcription.next();
        this._destroySubcription.complete();
      }
}
