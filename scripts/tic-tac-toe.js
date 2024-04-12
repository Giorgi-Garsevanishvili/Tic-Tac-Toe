
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];

document.querySelector('.btn1').addEventListener('click', () => {
  cellClicked(0);
})

document.querySelector('.btn2').addEventListener('click', () => {
  cellClicked(1);
})

document.querySelector('.btn3').addEventListener('click', () => {
  cellClicked(2);
})

document.querySelector('.btn4').addEventListener('click', () => {
  cellClicked(3);
})

document.querySelector('.btn5').addEventListener('click', () => {
  cellClicked(4);
})

document.querySelector('.btn6').addEventListener('click', () => {
  cellClicked(5);
})

document.querySelector('.btn7').addEventListener('click', () => {
  cellClicked(6);
})

document.querySelector('.btn8').addEventListener('click', () => {
  cellClicked(7);
})

document.querySelector('.btn9').addEventListener('click', () => {
  cellClicked(8);
})

function cellClicked(index){
  if (cells[index] === ''){
      cells[index] = currentPlayer;
      renderBoard();
      if (checkWin()){
        alert(currentPlayer + 'wins')
        resetGame();
      } else if (checkDraw()){
        alert('Draw')
        resetGame();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
  }
}

function renderBoard() {
  const buttons = document.querySelectorAll('.btn');
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].innerText = cells[i];
  }
}

function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
      if (cells[i] === '') {
          return false;
      }
  }
  return true;
}

function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  renderBoard();
}


function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return true;
      }
  }
  return false;
  }
