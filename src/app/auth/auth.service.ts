import { Injectable } from '@angular/core';
import { UsersService } from '../users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UsersService) { }
  loggedIn = false;
 
  isAuthenticated() {
    //Recuperamos la clave authenticated de localStorage
    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(localStorage.getItem('authenticated')==='true');
    //     }, 800);
    //   }
    // );
    // return promise;
    return localStorage.getItem('authenticated')==='true'
  }
 
  login(email: string, password: string){
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
    this.userService.getUserByEmail(email)
    .subscribe({
      next: (resp)=> {
        if (resp.email===email && resp.password===password){
          localStorage.setItem('authenticated', 'true');
          
        }
        else{
          localStorage.setItem('authenticaded', 'false');
         
        }
      },
      error: (error) => {
        localStorage.setItem('authenticated', 'false');
        
      }
    })
    
    
  }
 
  logout() {
    //Cambiamos el valor de la clave authenticated a false en localStorage
    localStorage.setItem('authenticated', 'false')
    
  }
}
