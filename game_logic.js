let playertext = document.getElementById('playertext');
let restart = document.getElementById('restartbtn');
let turn = document.getElementById('turn');
let gamebd = document.getElementById('gameboard');

let boxes = Array.from(document.getElementsByClassName('box'));
let winner_indicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_text = "O";
const X_text = "X";
let currentplayer = X_text;
let spaces = Array(9).fill(null);

const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}


function boxClicked(e){
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id] = currentplayer;
        e.target.innerText = currentplayer;
        
        if(PlayerhasWon() !== false)                
        {               
            
            playertext.innerText = `${currentplayer} has Won!`;
            let winning_blocks = PlayerhasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winner_indicator);     
            spaces.fill(id);

        } 
        else if (spaces.every(cell => cell !== null)) {
            playertext.innerText = " DRAW! ";

        }
        else {

            currentplayer = currentplayer == X_text ? O_text : X_text;
            turn.innerText = `${currentplayer} Turn`;
        }
        document.getElementById("turn").style.opacity = "1";
    }
}


const WinningCombos = [
    [0,1,2],    
    [3,4,5],   
    [6,7,8],    
    [0,3,6],    
    [1,4,7],    
    [2,5,8],    
    [0,4,8],    
    [2,4,6],    
] 

function PlayerhasWon(){
    for (const condition of WinningCombos) {
        let [a,b,c] = condition;
        
        if(spaces[a] && (spaces[a] == spaces[b]  && spaces[a] == spaces[c])){
            return [a,b,c];
        }
    }
    return false;
} 

restart.addEventListener('click', restartgame);

function restartgame(){
    spaces.fill(null);

    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    }) 

    document.getElementById("turn").style.opacity = "0";
    playertext.innerText = 'TIC TAC TOE';
    // turn.innerText = 'Turns Here';

    currentplayer = X_text;
} 

startgame();

