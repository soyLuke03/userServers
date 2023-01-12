import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn():void{
      console.log('Email: ', this.email, 'Password: ', this.password)
      this.authService.login(this.email,this.password)
      .subscribe({
        next: (resp) => {
          if (resp) this.router.navigate(['/servers']);
          else confirm('Email o contraseña incorrectos');
        }
      })
      
    }
    
  logOut():void{
    this.authService.logout();
  }
    
  
}
