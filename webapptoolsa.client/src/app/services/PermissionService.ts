import { Injectable } from "@angular/core";
import { ModuleAccessDto } from "../models/Users";

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissions: Array<ModuleAccessDto> = [];

  setPermission(info: Array<ModuleAccessDto>) {
    this.permissions.push(...info);
  }

  hasPermission(module: string, action: string): boolean {
    const modulePermissions = this.permissions.find(i => i.moduleName === module);
    if (!modulePermissions) return false;
    return modulePermissions.actions.includes(action);
  }

  
  canViewModule(module: string): boolean {
    return this.hasPermission(module, 'View');
  }

  ResetPermission() {
    this.permissions = [];
  } 


  async SavePermission(): Promise<void> {
    return new Promise((resolve) => {
      if (this.permissions.length > 0) {
        localStorage.setItem('permissions', JSON.stringify(this.permissions));
      }
      resolve();
    });
  }

  async clearPermission(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem('permissions');
      resolve();

    })
    
  }

  loadPermissions() {
    const stored = localStorage.getItem('permissions');
    if (stored) {
      this.permissions = JSON.parse(stored) as ModuleAccessDto[];
    }
  }




}
