import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { UsersService } from '../users/services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../servers/interfaces/token.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:8000/auth/login';
  urlAuth: string = 'http://localhost:8000/jwt'

  loggedIn = false;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private userService: UsersService, private http:HttpClient) { }
  
 
  isAuthenticated(): Observable<boolean> { 

    /*
    const httpHeader = new HttpHeaders()
    .set('Authorization','Bearer ' + localStorage.getItem('token'))
    */

    return this.http.get<any>(this.urlAuth/*, {headers: httpHeader}*/)
    .pipe( switchMap( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Access granted',
        timer: 1000,
        timerProgressBar: true
      })
      return of(true)
    }),
    catchError(err => {
      localStorage.removeItem('token')
      /*--------------------*/
      let timerInterval:any
      Swal.fire({
        icon: 'warning',
        title: 'Revoked access',
        html: 'You do not have permissions to enter here',
        timer: 3000,
        timerProgressBar: true
      })
      /*---------------------*/
      return of(false)
    })
    )
  }
 
  login(email: string, password: string):Observable<boolean>{
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
  
    
  return this.http.post<AuthResponse>(this.url, {email, password},this.httpOptions)
    .pipe( switchMap(token => {
      localStorage.setItem('token', token.access_token);
      
      Swal.fire({
        icon: 'success',
        title: 'Access granted',
        timer: 800,
        timerProgressBar: true
      })

      return of(true);
    }),catchError(error => {
      localStorage.removeItem('token');
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Credentials are incorrect',
        timer: 3000,
        timerProgressBar: true
      })

      return of(false);
    })

    )

    
  }
 
  logout() {
    //Cambiamos el valor de la clave authenticated a false en localStorage
    Swal.fire({
      icon: 'success',
      title: 'Log Out',
      text: 'You have been logged out succesfully',
      timer: 3000,
      timerProgressBar: true 
    })
    localStorage.setItem('token', 'false');
    localStorage.removeItem('rol'); 
  }
}
