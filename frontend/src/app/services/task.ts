import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/task`)
      .pipe(
        timeout(environment.apiTimeout),
        catchError(this.handleError)
      );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/task/${id}`)
      .pipe(
        timeout(environment.apiTimeout),
        catchError(this.handleError)
      );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/task`, task, this.httpOptions)
      .pipe(
        timeout(environment.apiTimeout),
        catchError(this.handleError)
      );
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/task/${id}`, task, this.httpOptions)
      .pipe(
        timeout(environment.apiTimeout),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/task/${id}`)
      .pipe(
        timeout(environment.apiTimeout),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Erro na API:', error);
    
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
