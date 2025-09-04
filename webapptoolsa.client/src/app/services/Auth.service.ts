import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getVerification(info: {Username:string,Password:string}) {
    return this.http.post<{ token: string }>('/auth',info).pipe(tap(data => this.saveToken(data.token)))
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
}