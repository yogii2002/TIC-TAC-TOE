const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameGrid= ["","","","","","","","",""];

    //Emptying all the boxes on UI
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents="all";

        box.classList = `box box-${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    //UI Update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}





function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position)=>{
        if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]=== gameGrid[position[1]]) &&(gameGrid[position[1]]=== gameGrid[position[2]]) ){
        
            if(gameGrid[position[0]] === "X")
                answer="X";
            else
                answer="O";

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            
            //Now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    });
    if(answer!==""){
        gameInfo.innerText = `Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return ;
    }
    // lets check whether there is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !== "")
         fillCount++;
    });
    //if board is filled then game is TIE;
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }      
    
}



function handleClick(index){
    //checking if the box is empty
    if(gameGrid[index]===""){
        //set current player to UI
        boxes[index].innerHTML = currentPlayer;

        //Its for out logic
        gameGrid[index]=currentPlayer;
        //Making the button Unclickable after placing our (X/O) sign
        boxes[index].style.pointerEvents = "none";

        //swapping the player
        swapTurn();

        //Check if a player wins or not
        checkGameOver();

    }    
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",()=>{
    initGame();
    
})