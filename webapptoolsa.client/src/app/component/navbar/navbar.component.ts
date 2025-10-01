import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PermissionService } from '../../services/PermissionService';
import { AccessCompanyDto } from '../../models/Users';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatButtonModule, MatMenuModule, MatIconModule, MatListModule, MatDividerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  permissionService = inject(PermissionService);
  private router = inject(Router);
  username = signal<string>("");
  usershort = signal<string>("");
  companies = signal<AccessCompanyDto[]>([]);
  selectedCompany = signal<string | null>(null);
  selectedWarehouse = signal<string | null>(null);

  async ngOnInit() {
    const info = this.authService.getUserInfo();
    this.username.set(info?.username ?? "");
    this.usershort.set(this.initials() ?? "");

    this.permissionService.loadPermissions();
    await this.permissionService.clearPermission();
    this.authService.loadCompanies();
    await this.authService.clearCompanies();
    this.companies.set(this.authService.getAccessCompany());
    window.addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  async logout() {
    this.authService.deleteToken();
    await this.permissionService.clearPermission();
    await this.authService.clearCompanies();
    this.permissionService.ResetPermission();
    this.authService.resetCompanies();

    this.router.navigate(['/']);

  }


  selectWarehouse(company: string, warehouse: string) {
    this.selectedCompany.set(company);
    this.selectedWarehouse.set(warehouse);
  }

  initials(): string {
    return this.authService.getUserInfo()?.username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() ?? "";
  }

  displayText = computed(() => {
    return this.selectedCompany() && this.selectedWarehouse()
      ? `${this.selectedCompany()} / ${this.selectedWarehouse()}`
      : 'No hay dato Seleccionado';
  })

  async handleUnload(event: BeforeUnloadEvent) {
    const perfom = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const isRefresh = perfom.type === "reload";
    if (isRefresh) {
      await this.permissionService.SavePermission();
      this.authService.SaveAccessCompany();
    }
  }
}
