import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

export abstract class BaseUpsertComponent<T> {
  obj: Partial<T> = {};
  isNew = true;

  protected _destroyRef = inject(DestroyRef);

  constructor(
    protected dialogRef: MatDialogRef<any>,
    data: Partial<T>
  ) {
    if (data) {
      this.obj = data;
      this.isNew = false;
    }
  }

  protected abstract create(item: unknown): Observable<unknown>;
  protected abstract update(item: unknown): Observable<unknown>;
  protected abstract isValid(obj: Partial<T>): boolean;


  save(): void {
    const request$ = this.isNew
      ? this.create(this.obj)
      : this.update(this.obj);

    request$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data) => this.dialogRef.close(data),
      error: (err) => console.error(err)
    });
  }
}
