import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/Company.service';
import { CompanyDto } from '../../models/Company';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  
})
export class CompanyComponent implements OnDestroy,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  data!:MatTableDataSource<CompanyDto>;
  dataNameColumns: string[] = ["id", "name", "address","contactInfo","action"]
  

  private _companyService = inject(CompanyService)
  private _destroySubcription = new Subject<void>();


  

  ngAfterViewInit(): void {
    this._companyService.getAll().pipe(takeUntil(this._destroySubcription)).subscribe({
      next: (data:CompanyDto[]) => {
        this.data = new MatTableDataSource(data);
         this.data.paginator = this.paginator;
          this.data.sort = this.sort;
      },
      error: (error:unknown) => console.log("erro in all data company", error)
    });
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  edit(){
    console.log("edit company")
  }

  ngOnDestroy(): void {
    this._destroySubcription.next();
    this._destroySubcription.complete();
  }
}
