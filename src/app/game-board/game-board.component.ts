import { Component } from '@angular/core';
import { GameCellComponent } from '../game-cell/game-cell.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameCellComponent, CommonModule, FormsModule],
  template: `
    <div class="game-container">
      <div class="score-board">
        <div class="score">
          <span>X Wins: {{ xWins }}</span>
          <span>O Wins: {{ oWins }}</span>
          <span>Draws: {{ draws }}</span>
        </div>
        <div class="mode-selector">
          <label>
            <input type="checkbox" 
              [(ngModel)]="playWithAI"
              (change)="resetGame()"
            > 
            Play with AI
          </label>
        </div>
      </div>

      <div class="board">
        <div class="row" *ngFor="let row of board; let rowIndex = index">
          <app-game-cell 
            *ngFor="let cell of row; let colIndex = index"
            [value]="cell"
            [disabled]="winner !== null"
            (click)="makeMove(rowIndex, colIndex)"
          ></app-game-cell>
        </div>

        <div *ngIf="winner" class="game-result">
          <p *ngIf="winner !== 'Draw'">Winner: {{ winner }}</p>
          <p *ngIf="winner === 'Draw'">It's a Draw!</p>
        </div>

        <button 
          class="reset-btn" 
          (click)="resetGame()"
        >
          Reset Game
        </button>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
    }

    .score-board {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 8px;
    }

    .score {
      display: flex;
      gap: 15px;
    }

    .board {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .row {
      display: flex;
    }

    .game-result {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .reset-btn {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .reset-btn:hover {
      background-color: #45a049;
    }
  `]
})
export class GameBoardComponent {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  winner: string | null = null;
  
  // Thêm các biến theo dõi điểm số
  xWins = 0;
  oWins = 0;
  draws = 0;

  // Chế độ chơi với AI
  playWithAI = false;

  makeMove(row: number, col: number) {
    // Kiểm tra ô trống và chưa có người chiến thắng
    if (this.board[row][col] === '' && !this.winner) {
      // Đánh dấu nước đi
      this.board[row][col] = this.currentPlayer;
      
      // Kiểm tra người chiến thắng
      this.checkWinner();

      // Chế độ chơi với AI
      if (this.playWithAI && !this.winner) {
        this.currentPlayer = 'O';
        this.aiMove();
      } else {
        // Chuyển lượt
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  // Nước đi của AI (đơn giản)
  aiMove() {
    // Tìm ô trống đầu tiên
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          this.board[i][j] = 'O';
          this.checkWinner();
          this.currentPlayer = 'X';
          return;
        }
      }
    }
  }

  checkWinner() {
    const lines = [
      // Hàng ngang
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      
      // Hàng dọc
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      
      // Đường chéo
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]]
    ];

    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        this.winner = line[0];
        // Cập nhật điểm số
        if (this.winner === 'X') this.xWins++;
        if (this.winner === 'O') this.oWins++;
        return;
      }
    }

    // Kiểm tra hòa
    if (this.board.every(row => row.every(cell => cell !== ''))) {
      this.winner = 'Draw';
      this.draws++;
    }
  }

  resetGame() {
    // Khôi phục trạng thái ban đầu
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;

    // Nếu chơi với AI và AI là O, thực hiện nước đi đầu
    if (this.playWithAI && this.currentPlayer === 'O') {
      this.aiMove();
    }
  }
}
