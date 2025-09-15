import { AfterViewInit, DestroyRef, Directive, inject, OnInit, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { filter } from "rxjs";



@Directive() 
export abstract class BaseCrudTableComponent<T> implements OnInit{
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected _destroyRef = inject(DestroyRef);
  protected readonly dialog = inject(MatDialog);

  data!: MatTableDataSource<T>;
  abstract displayedColumns: string[];

  // Must be provided by subclass
  protected abstract getAll(): any;
  //protected abstract removeEntity(id: number): any;
  protected abstract openDialog(entity?: Partial<T>): any;

  ngOnInit(): void {
   this.getAll()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (data: T[]) => {
          this.data = new MatTableDataSource(data);
           this.data.paginator = this.paginator;
    this.data.sort = this.sort;
        },
        error: (error: unknown) => console.error('Error loading data', error),
      });
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  new() {
    const dialogRef = this.openDialog();
    dialogRef
      .afterClosed()
      .pipe(
        filter(
          (data: any) =>
            data != null &&
            typeof data.name === 'string' &&
            data.name.trim() !== ''
        ),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (data: T) => {
          this.data.data = [...this.data.data, data];
        },
        error: (error:unknown) => console.error(error),
      });
  }

  edit(entity: Partial<T>) {
    const dialogRef = this.openDialog(entity);
    dialogRef
      .afterClosed()
      .pipe(
        filter(
          (data: any) =>
            data != null &&
            typeof data.name === 'string' &&
            data.name.trim() !== ''
        ),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: (data: T & { id: number }) => {
          const index = this.data.data.findIndex((x: any) => x.id === data.id);
          if (index >= 0) {
            this.data.data[index] = data;
            this.data.data = [...this.data.data];
          }
        },
        error: (error:unknown) => console.error(error),
      });
  }

  /*remove(id: number) {
    this.removeEntity(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.data.data = this.data.data.filter(
            (item: any) => item.id !== id
          );
        },
        error: (error: unknown) => console.error(error),
      });
  }*/
}
