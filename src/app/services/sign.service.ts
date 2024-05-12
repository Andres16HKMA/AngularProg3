import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sign } from '../models/sign.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }
  list(): Observable<Sign[]> {
    return this.http.get<Sign[]>(`${environment.url_ms_security}/api/public/users`);
    
  }

  view(id:number): Observable<Sign>{
    return this.http.get<Sign>(`${environment.url_ms_security}/api/public/users/${id}`);
  }

  create(NewSign: Sign): Observable<Sign>{
    return this.http.post<Sign>(`${environment.url_ms_security}/api/public/users`,NewSign);
    
  }


  delete(id:number): Observable<Sign>{
    return this.http.delete<Sign>(`${environment.url_ms_security}/api/public/users/${id}`);
    
  }
}

