//constants
let direction = {x:0, y:0};
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameOver.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
]
food = {x: 5, y:6}; 

//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 0} 
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

         case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

         case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
                break;
            
            
    }
});

//function
function main(ctime) {
    window.requestAnimationFrame(main);
    musicSound.play();
     //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    for(let i = 1; i<snakeArr.length; i++){
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
       }
    }
    if (snake[0].x>=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
        
    }
  }
  
function gameEngine(){
 //1. game over ans play start 
     if(isCollide(snakeArr)){
     gameOverSound.play();
     musicSound.pause();
     inputDir = {x: 0, y: 0}
     alert("Game Over😥 Press Enter to Again Play");
    snakeArr = [{x: 13, y:12}];
    score = 0;
    }

        
//eating food, increment score
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x:Math.round(a +(b-a)* Math.random()), y: Math.round(a +(b-a)* Math.random())}
    }

    //move snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x+= inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display head of snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
    
        board.appendChild(snakeElement);
    
    });
      //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
     board.appendChild(foodElement);
}




