// CONSTANTS
const game_area_width = 700;
const game_area_height = 500;
const ball_size = 20;
const paddle_width = 20;
const paddle_height = 100;

//BALL POSITION AND VELOCITY
let positionX = 100;
let positionY = 100;
let velocityX = 4;
let velocityY = 4;

//GET THE BALL DOM ELEMENT
const ball = document.querySelector(".ball");

//COMPUTER PADDLE VARIABLES
const computer = document.querySelector(".computer-paddle");
let computerPositionY = 100;

//PLAYER PADDLE VARIABLES
const player = document.querySelector(".player-paddle");
let playerPositionY = 100;

//HANDLE KEYBOARD INPUT
const handleKeyboardInput = (event) => {
  if (event.key === "ArrowDown") {
    playerPositionY += 100;
  } else if (event.key === "ArrowUp") {
    playerPositionY -= 100;
  }
}
//PLAYER PADDLE CONTROLLER
document.addEventListener("keydown", handleKeyboardInput);

//UPDATE PONG 
const update = () => {
  positionX += velocityX;
  positionY += velocityY;

  computerPositionY = positionY;

  //IF WE HIT THE BOTTOM - BALL WILL GO UP IN DIRECTION
  if (positionY >= game_area_height - ball_size) {
    velocityY = -velocityY;
  }

  //IF WE HIT THE TOP, MAKE THE BALL GO IN THE DOWN DIRECTION
  if (positionY <= 0) {
    velocityY = -velocityY;
  }

  //IF THE BALL HITS THE LEFT OR THE RIGHT, RESET IT
  if (positionX <= 0 || positionX >= game_area_width - ball_size) {
    positionX = 100;
    positionY = 100;
  }

  //IF THE BALL HITS THE COMPUTER PADDLE, BOUNCE IT
  if (
    positionX >= game_area_width - ball_size - paddle_width &&
    positionY >= computerPositionY - ball_size &&
    positionY <= computerPositionY + paddle_height
  ) {
    velocityX = - velocityX;
  }

  //IF THE BALL HITS THE PLAYER PADDLE, BOUNCE IT
  if (
    positionX <= paddle_width &&
    positionY >= playerPositionY - ball_size &&
    positionY <= playerPositionY + game_area_height
  ) {
    velocityX = -velocityX;
  }

  ball.style.top = `${positionY}px`;
  ball.style.left = `${positionX}px`;

  computer.style.top = `${computerPositionY}px`;
  player.style.top = `${playerPositionY}px`;
}

//CALL THE UPDATE() FUNCTION EVERY TIME THE BROWSER IS READY TO RE-RENDER
function loop() {
  update();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
