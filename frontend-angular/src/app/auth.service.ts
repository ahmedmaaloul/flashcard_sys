// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environment';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/user/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/user/register`, { username, password });
  }
  getUsername(): Observable<{ username: string }> {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<{ username: string }>(`${this.apiUrl}/user/username`,{ headers });
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }
}
