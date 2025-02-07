import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  standalone: true,
  template: `
    <div 
      class="cell" 
      [class.disabled]="disabled"
      [class.x]="value === 'X'"
      [class.o]="value === 'O'"
    >
      {{ value }}
    </div>
  `,
  styles: [`
    .cell {
      width: 100px;
      height: 100px;
      border: 2px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .cell:hover {
      background-color: #f0f0f0;
    }
    .cell.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .cell.x {
      color: blue;
    }
    .cell.o {
      color: red;
    }
  `]
})
export class GameCellComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;
}
