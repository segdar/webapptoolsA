import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatButtonModule, MatMenuModule, MatIconModule, MatListModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  logout() {
     this.authService.deleteToken();
    this.router.navigate(['/']); 
  }

  companies = [
    { name: 'Acme Corp', warehouses: ['East-01', 'West-02'] },
    { name: 'Globex Inc', warehouses: ['North-01', 'South-02'] },
  ];

  selectedCompany: string | null = 'Acme Corp';
  selectedWarehouse: string | null = 'East-01';

  selectWarehouse(company: string, warehouse: string) {
    this.selectedCompany = company;
    this.selectedWarehouse = warehouse;
  }

  get displayText(): string {
    return this.selectedCompany && this.selectedWarehouse
      ? `${this.selectedCompany} / ${this.selectedWarehouse}`
      : 'Select Company & Warehouse';
  }
}
