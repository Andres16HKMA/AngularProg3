import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Security } from '../models/security.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  secondFactor(theSecurity: Security): Observable<Security>{
    return this.http.put<Security>(`${environment.url_ms_security}/api/public/security/second-Factor${theSecurity._id}`,theSecurity);
    
  }

  login(newSecurity: Security): Observable<Security>{
    return this.http.post<Security>(`${environment.url_ms_security}/api/public/security/login`,newSecurity); 
  }
}

