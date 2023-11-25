import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/users';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }

  agregarUsers(user: User): Observable<User> {
    return this.http.post<User>(this.serviceURL, user);
  }

  getUsers(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.serviceURL}/?email=${email}`);
  }

  getXP(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.serviceURL}/?experience=${email}`);
  }


  funcion(user: User): Observable<User> {
    return this.http.put<User>(this.serviceURL + '/' + user.id, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('1') !== null;
    console.log('Usuario autenticado:', isLoggedIn);
    return isLoggedIn;
  }
  

}

