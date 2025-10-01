import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { tap } from "rxjs";
import { AccessCompanyDto, JwtPayload, ModuleAccessDto} from "../models/Users";
import { decodeToken } from "../shared/Shared";
import { PermissionService } from "../services/PermissionService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _permission = inject(PermissionService)
  private _Companies: Array<AccessCompanyDto> = []
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getVerification(info: {Username:string,Password:string}) {
    return this.http.post<{ token: string, access: Array<AccessCompanyDto>, permission: Array<ModuleAccessDto>}>(`${environment.apiUrl}/auth`, info).pipe(tap(data => {
      this.saveToken(data.token);
      this._permission.setPermission(data.permission);
      this.setAccessCompany(data.access);
    }))
  }
  saveToken(token: string) {
    // Expires in 1 day
    this.cookieService.set('authToken', token, 1);
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  deleteToken() {
    this.cookieService.delete('authToken');
  }

  isLoggedIn() {
    const tmp = this.getToken();
    return !!tmp;
  }

  setAccessCompany(info: Array<AccessCompanyDto>) {
    this._Companies.push(...info)
  }

  getAccessCompany(): Array<AccessCompanyDto> {
    return this._Companies;
  }

  getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    return token ? decodeToken(token) : null;
  }

  async SaveAccessCompany():Promise<void> {
    return new Promise((resolve) => {
      if (this.getAccessCompany().length > 0) {
        localStorage.setItem('companies', JSON.stringify(this.getAccessCompany()));
      }
      resolve();
    })
    
  }

  resetCompanies() {
    this._Companies = [];
  }
  async clearCompanies():Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem('companies');
      resolve();
    })
   
  }

  loadCompanies() {
    const stored = localStorage.getItem('companies');
    if (stored) {
      this._Companies = JSON.parse(stored) as AccessCompanyDto[];
    }
  }

  
}
