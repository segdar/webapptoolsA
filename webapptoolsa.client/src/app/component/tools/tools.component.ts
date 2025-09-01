import { Component, inject, ViewChild } from '@angular/core';
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
import { ConditionalTools, Tools } from '../../models/Tools';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {
   @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    
    
      private _destroySubcription = new Subject<void>();
      private _toolsService = inject(ToolsServices)
    
      data!: MatTableDataSource<Tools>;
      dataNameColumns: string[] = ['id', 'name', 'description', 'location', 'provider', 'barcode', 'qr', 'cost', 'objcategory', 'statustools', 'isActived']
    
    
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
      
       applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    
        if (this.data.paginator) {
          this.data.paginator.firstPage();
        }
      }
    
        edit(){
        console.log("edit tools")
      }
    
    
      
      ngOnDestroy(): void {
        this._destroySubcription.next();
        this._destroySubcription.complete();
      }
}
