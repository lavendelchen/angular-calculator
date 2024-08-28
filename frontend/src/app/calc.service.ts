import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Calc } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  postResult(num1: number, num2: number, result: number, operation: string): Observable<any> {
    const calc: Calc = {
      num1: num1,
      num2: num2,
      result: result,
      operation: operation,
      timestamp: new Date().toISOString()
    }

    return this.http.post<number>(
      "http://localhost:3000/api/calc",
      JSON.stringify(calc)
    )
  }

  getResult(): Observable<any> {
    return this.http.get(
      "http://localhost:3000/api/calc"
    )
  }
}
