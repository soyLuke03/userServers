import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
 

  
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    let request = req;

    if(token){
      
      request =req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`          
        }
      })
    }
    
    console.log(request.headers.keys());

    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          this.router.navigateByUrl('/');
        }
        return throwError(err);
      })
    )
  }
}
