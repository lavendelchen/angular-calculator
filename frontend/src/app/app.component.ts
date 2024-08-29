import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalcService } from './calc.service';

import { Calculation as Calc, Operation as Op } from './app.types';

enum CALC {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public CALC = CALC;

  calcService = inject(CalcService)

  title = 'angular-balluff';
  num1 = 3;
  num2 = 4;
  result = 0;
  recentlyHovered: CALC = CALC.ADD;
  calc: Op[] = [];
  lastResult: null | Calc = null
  
  calculate(calcIndex: CALC) {
    this.calc[calcIndex].func()
    this.calcService.postResult(
      this.num1,
      this.num2,
      this.result,
      this.calc[calcIndex].name
    ).subscribe({
      next: (response) => {
        console.log(`Successfully posted result ${response}!`)
      },
      error: (error) => {
        console.error("Post request of calc result was unsuccessful.", error)
      }
    });
  }

  getLastResult() {
    this.calcService.getResult().subscribe({
      next: (response) => {
        this.lastResult = response
      },
      error: (error) => {
        console.error("Couldn't get the result :((")
      }
    })
  }

  getLastResultSymbol() {
    const operation = this.calc.find(op => {
      if (!this.lastResult)
        return false
      return op.name === this.lastResult.operation
    });
    return operation ? operation.symbol : 'Operation not found';
  }

  constructor() {
    this.calc[CALC.ADD] = {
      symbol: "+",
      name: "Add",
      func: () => {
        this.result = this.num1 + this.num2;
      }
    }
    this.calc[CALC.SUBTRACT] = {
      symbol: "-",
      name: "Subtract",
      func: () => {
        this.result = this.num1 - this.num2;
      }
    }
    this.calc[CALC.MULTIPLY] = {
      symbol: "*",
      name: "Multiply",
      func: () => {
        this.result = this.num1 * this.num2;
      }
    }
    this.calc[CALC.DIVIDE] = {
      symbol: "/",
      name: "Divide",
      func: () => {
        this.result = this.num1 / this.num2;
      }
    }
  }
}
