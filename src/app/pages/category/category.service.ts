import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryResponse } from '@app/shared/models/category.interface';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  lista(): Observable<CategoryResponse[]>{
    return this.http.get<CategoryResponse[]>(`${environment.URL_API}/category`)
    .pipe(catchError((err) => this.handleError(err)));
  }

 
   new(nombre:CategoryResponse):Observable<any>{
     return this.http.put<any>(`${environment.URL_API}/category`,nombre)
     .pipe(catchError((error)=>this.handleError(error)));
   }

  GetById(): void{}
  update(nombre:CategoryResponse):Observable<any>{
    return this.http.post<any>(`${environment.URL_API}/category`,nombre)
    .pipe(catchError((error)=>this.handleError(error)));
  }

  
  delete(cveCategoria: number):Observable<any> {
    return this.http.delete<any>(`${environment.URL_API}/category/${cveCategoria}`,)
     .pipe(catchError((error)=>this.handleError(error)));
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (err) errorMessage = `Error: ${typeof err.error.message == 'undefined' ? err.message : err.error.message }`;

    this._snackBar.open(errorMessage, '', {
      duration: 6000,
    });
    return throwError(errorMessage);
  }
}