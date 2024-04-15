let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let result = JSON.parse(localStorage.getItem('score')) || {
  X: 0,
  O: 0,
  tie: 0
}

resultColumn();

displayFlow();

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
      displayResult();
      
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



function displayFlow (){
  let Player = currentPlayer;
  document.querySelector('.gameFlow').innerHTML = `YOUR TURN ${Player}`;
}

function displayResult (){
  if (checkWin()){
    value = true;
    resultClass(value);
  } else if (checkDraw()){
    value = false;
    resultClass(value);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayFlow();
        }

 

  function resultClass (value){
    document.querySelector('.status-box').classList.add('winStatus-box');

    if (value === false){
      document.querySelector('.status-cont').classList.add('winStatus-cont-drow');
    } else {
      document.querySelector('.status-cont').classList.add('winStatus-cont');
    }
    

    if (value === true ){
      document.querySelector('.winStatus-cont').innerHTML =  `
      <div class="res-box">
        <div class="close">
          <button class="closeButton">X</button>
        </div>
        <div class="res-cont">${currentPlayer}, You Win!</div>
      </div>
    `
      if (currentPlayer === 'X'){
        result.X ++;
        resultColumn();
      } else if (currentPlayer === 'O'){
        result.O ++;
        resultColumn();
      } 

      document.querySelector('.closeButton').addEventListener('click', () => {
        closeButton();
      })
    } else if (value === false) {
      result.tie ++;
      resultColumn();
      document.querySelector('.winStatus-cont-drow').innerHTML =  `
      <div class="res-box">
        <div class="close">
          <button class="closeButton-drow">X</button>
        </div>
        <div class="res-cont">Draw!</div>
      </div>
    `
      document.querySelector('.closeButton-drow').addEventListener('click', () => {
        closeButton();
      })
    }
    saveResult();
    
    
  }
  
  function  closeButton (){
    if (value === true){
      document.querySelector('.winStatus-cont').innerHTML ='';
      document.querySelector('.status-box').classList.remove('winStatus-box')
      document.querySelector('.status-cont').classList.remove('winStatus-cont')
    } else {
      document.querySelector('.winStatus-cont-drow').innerHTML ='';
      document.querySelector('.status-box').classList.remove('winStatus-box')
      document.querySelector('.status-cont').classList.remove('winStatus-cont-drow')
    }
    
    resetGame();
  }
}

function resultColumn (){
  document.querySelector('.result').innerHTML = `X = ${result.X}  O = ${result.O} Draw = ${result.tie}`;
}

document.querySelector('.reset-button').addEventListener('click', () => {
  result.O = 0;
  result.X = 0;
  result.tie = 0;
  resultColumn();
  resetGame();
  saveResult();
})

function saveResult (){
  localStorage.setItem('score', JSON.stringify(result));
}