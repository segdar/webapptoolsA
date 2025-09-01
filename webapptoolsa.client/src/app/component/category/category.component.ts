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
import { Category } from '../../models/Tools';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnDestroy,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  private _destroySubcription = new Subject<void>();
  private _toolsService = inject(ToolsServices)

  data!: MatTableDataSource<Category>;
  dataNameColumns: string[] = ["id", "name", "isActived", "action"]


  ngAfterViewInit(): void {
    this._toolsService.getCategory().pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data:Category[]) => {
          this.data = new MatTableDataSource(data);
             this.data.paginator = this.paginator;
              this.data.sort = this.sort;
      },
       error: (error:unknown) => console.log("erro in all data category", error)
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
    console.log("edit category")
  }


  
  ngOnDestroy(): void {
    this._destroySubcription.next();
    this._destroySubcription.complete();
  }

}
