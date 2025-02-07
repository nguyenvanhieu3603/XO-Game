import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameBoardComponent],
  template: `
    <div class="container">
      <h1>XO Game</h1>
      <app-game-board></app-game-board>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class AppComponent {}
