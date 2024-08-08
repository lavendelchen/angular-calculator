import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  num1 = 3;
  num2 = 4;
  result = 0;

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
