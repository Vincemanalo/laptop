  import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { catchError, map, Observable, retry, throwError } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class FeaturesService {
    private baseUrl = 'http://10.0.0.68:3000';

    // private baseUrl = "https://67ce827a125cd5af757abfbb.mockapi.io/device/laptop";

    constructor(private http: HttpClient) {}


    // LAPTOP 

    addLaptop(laptop: any): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      return this.http
        .post<any>(`${this.baseUrl}/device/laptop`, laptop, options)
        .pipe(retry(3), catchError(this.handleError));
    }

    getAllLaptop(): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http.get<any>(`${this.baseUrl}/device/laptop`, options).pipe(
        map((data: any) => data),
        retry(3),
        catchError(this.handleError)
      );
    }

    // LAPTOP
    

    // EMPLOYEE
    addEmployee(employee: any): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: `${token}`,
        }),
      };

      return this.http
      .post<any>(`${this.baseUrl}/user/employee`, employee, options)
      .pipe(retry(3), catchError(this.handleError));
      }


    getAllEmployee(): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      
      return this.http.get<any>(`${this.baseUrl}/user/employee`, options).pipe(
        map((data: any) => data),
        retry(3),
        catchError(this.handleError)
      );
    }

    // Employee
    

    getLaptopById(id: number): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http
        .get<any>(`${this.baseUrl}/${id}`, options)
        .pipe(retry(3), catchError(this.handleError));
    }

    updateLaptop(id: number, laptop: any): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http
        .put<any>(`${this.baseUrl}/device/laptop/${id}`, laptop, options)
        .pipe(retry(3), catchError(this.handleError));
    }
    getEmployeeById(id: number): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http
        .get<any>(`${this.baseUrl}/${id}`, options)
        .pipe(retry(3), catchError(this.handleError));
    }
    updateEmployee(id: number, employeeData: any): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };
      // emoployeeData
      return this.http
        .put<any>(`${this.baseUrl}/user/employee/${id}`, employeeData, options)
        .pipe(retry(3), catchError(this.handleError));
    }

    disableLaptop(id: number): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http
        .patch<any>(`${this.baseUrl}/${id}`, { status: 'disabled' }, options)
        .pipe(retry(3), catchError(this.handleError));
    }

    deleteLaptop(id: string): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const url = `${this.baseUrl}/device/laptop/${id}`;
      console.log('DELETE Request URL:', url); // Debugging URL
    
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        body: { isDeleted: true }, // Some PATCH requests require a body
      };
    
      return this.http
        .patch<any>(url, options)
        .pipe(retry(3), catchError(this.handleError));
    }
    

    // deleteEmployee(id: string): Observable<any> {
    //   const token = sessionStorage.getItem('auth_token');
    //   const url = `${this.baseUrl}/employee${id}`;
    //   console.log('DELETE Request URL:', url); // Debugging URL
    
    //   const options = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     }),
    //     body: { isDeleted: true }, // Some PATCH requests require a body
    //   };
    
    //   return this.http
    //     .patch<any>(url, options)
    //     .pipe(retry(3), catchError(this.handleError));
    // }

    disableEmployee(id: number): Observable<any> {
      const token = sessionStorage.getItem('auth_token');
      const url = `${this.baseUrl}/user/employee/${id}`;
      console.log('DELETE Request URL:', url); // Debugging URL

      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        }),
      };
    
      return this.http
        .patch<any>(`${this.baseUrl}/user/employee/${id}`, { status: 'disabled' }, options)
        .pipe(retry(3), catchError(this.handleError));
    }
    

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        console.error('An error occurred:', error.error.message);
        return throwError(() => new Error(error.error.message));
      } else {
        // The backend returned an unsuccessful response code.
        console.error(
          `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`
        );
        // Use the error message from the backend if available.
        const errorMessage = error.error?.message || 'Something bad happened; please try again later.';
        return throwError(() => new Error(errorMessage));
      }
    }
    
  }
