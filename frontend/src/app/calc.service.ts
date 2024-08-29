import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { Calculation as Calc } from './app.types';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  postResult(
    num1: number,
    num2: number,
    result: number,
    operation: "Add" | "Subtract" | "Multiply" | "Divide"
  ): Observable<any> {
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

  async getResult(): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http.get(
          "http://localhost:3000/api/calc"
        )
      )
      return response
    } catch (error) {
      console.error("Couldn't get the result :((");
      throw error
    }
  }
}
