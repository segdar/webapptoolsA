import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
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
import { ConditionalTools } from '../../models/Tools';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-conditionaltools',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './conditionaltools.component.html',
  styleUrl: './conditionaltools.component.css'
})
export class ConditionaltoolsComponent implements OnDestroy,AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  
    private _destroySubcription = new Subject<void>();
    private _toolsService = inject(ToolsServices)
  
    data!: MatTableDataSource<ConditionalTools>;
    dataNameColumns: string[] = ["id", "name", "isActived", "action"]
    objConditional: Partial<ConditionalTools> = {
      id:null
    };
  
    ngAfterViewInit(): void {
      this._toolsService.getStatus().pipe(takeUntil(this._destroySubcription)).subscribe({
        next: (data:ConditionalTools[]) => {
            this.data = new MatTableDataSource(data);
               this.data.paginator = this.paginator;
                this.data.sort = this.sort;
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

     addConditional() {
           
            this._toolsService.createConditional(this.objConditional).pipe(takeUntil(this._destroySubcription)).subscribe({
              next: (data:unknown) => {
                const tmpdata = data as ConditionalTools;
                this.data.data.push(tmpdata);
                this.data._updateChangeSubscription();
                this.objConditional= {};
              },
              error: (error) => console.log("Error in create new warehouse")
            })
          }
  
      edit(){
      console.log("edit conditional")
    }
  
  
    
    ngOnDestroy(): void {
      this._destroySubcription.next();
      this._destroySubcription.complete();
    }
}
