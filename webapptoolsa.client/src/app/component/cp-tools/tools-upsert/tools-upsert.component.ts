import { Component, computed, Inject, inject, OnInit, signal } from '@angular/core';
import { BaseUpsertComponent } from '../../abstract/BaseUpsertComponent';
import { Category, ConditionalTools, Tools, ToolsDto } from '../../../models/Tools';
import { Observable } from 'rxjs';
import { ToolsServices } from '../../../services/Tools.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tools-upsert',
  standalone: true,
  imports: [CommonModule,MatSelectModule, MatDialogContent, MatDialogActions, MatDialogClose, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './tools-upsert.component.html',
  styleUrl: './tools-upsert.component.css',
  
})
export class ToolsUpsertComponent extends BaseUpsertComponent<ToolsDto> implements OnInit {
  
  private toolsService = inject(ToolsServices);
  lstdataCategory = signal<Category[]>([]);
  lstTmpCategory = computed(() => this.lstdataCategory())
  lstdataConditional = signal<ConditionalTools[]>([]);
  searchCategory: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: Tools,
    dialogRef: MatDialogRef<ToolsUpsertComponent>) {
    super(dialogRef, data);
  }
  ngOnInit(): void {
    this.loadEndpoint();
  }

  private loadEndpoint() {
    this.toolsService.getCategory().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data: Category[]) => {
        this.lstdataCategory.set(data);
      },
      error: (error: unknown) => console.log("erro in all data category", error)
    })


    this.toolsService.getStatus().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data: ConditionalTools[]) => {
        this.lstdataConditional.set(data);

      },
      error: (error: unknown) => console.log("erro in all data conditional", error)
    })
  }

  create(item: any): Observable<Tools> {
    return this.toolsService.createTools(item);
  }
   update(item: any): Observable<Tools> {
    return this.toolsService.updateTools(item);
  }
  
  isValid(obj: Partial<ToolsDto>): boolean {
    return !!obj.description && !!obj.location &&!!obj.name &&!!obj.category &&!!obj.status_tool && !! this.obj.cost;
  }

  filterCategories(value: string) {
  const filterValue = value.toLowerCase();
  this.lstTmpCategory = computed(() => this.lstdataCategory().filter(c =>
    c.name.toLowerCase().includes(filterValue)
    
  ));
}
  onSelect(event: any) {
    this.searchCategory="";
    this.lstTmpCategory = this.lstdataCategory;
  }

}
