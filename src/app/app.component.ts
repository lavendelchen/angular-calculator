import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalcService } from './calc.service';

enum CALC {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE
}

interface Calc {
  symbol: string;
  name: string;
  func: () => void
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-balluff';

  public CALC = CALC;

  calcService = inject(CalcService)

  num1 = 3;
  num2 = 4;
  result = 0;
  
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

  recentlyHovered: CALC = CALC.ADD;
  calc: Calc[] = [];

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
