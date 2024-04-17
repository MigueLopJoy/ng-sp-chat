import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../models/register-request';
import { LoginRequest } from '../../models/login-request';
import { RegisterResponse } from '../../models/register-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  register<T>(body: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<T>('http://localhost:8080/api/auth/register', body) as Observable<RegisterResponse>;
  }

  login<T>(body: LoginRequest): Observable<string>{
    return this.httpClient.post<T>('http://localhost:8080/api/auth/login', body) as Observable<string>;
  }

  test<T>(): Observable<String>{
    return this.httpClient.get<T>('http://localhost:8080/api/messages/getMessage', {withCredentials: true}) as Observable<String>;
  }
}


