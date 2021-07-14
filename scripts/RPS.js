//some variables
let userScore=0;
let computerScore=0;
let round=0;
//game log array
let logArray=[];
//user buttons
const userRockButton=document.querySelector('.usr-rock');
const userPaperButton=document.querySelector('.usr-paper');
const userScissorsButton=document.querySelector('.usr-scissors');
//computer buttons
const computerRockButton=document.querySelector('.comp-rock');
const computerPaperButton=document.querySelector('.comp-paper');
const computerScissorsButton=document.querySelector('.comp-scissors');
//player and computer scores
const userScoreBox=document.querySelector('.user-score');
const computerScoreBox=document.querySelector('.computer-score');
//the log ol
const gameLog=document.querySelector('.gamelog');
//sounds
const userWinSound=document.getElementById('winSound');
const userLoseSound=document.getElementById('loseSound');
//FUNCTIONS

//mouse hover func
function userHover() {
    this.classList.add('userHover');
}
//mouse remove hover func
function removeHover() {
    this.classList.remove('userHover');
}
//random num generator for computer option
function computerOption(){
    let computerOpt=Math.floor(Math.random()*(3-1+1))+1;
    if (computerOpt===1){
        return 'piedra';
    }
    if (computerOpt===2){
        return 'papel';
    }
    return 'tijera';
}
//log function
function showLog(){
    let li=document.createElement('li');
    li.textContent=logArray[`${logArray.length-1}`];
    gameLog.appendChild(li);
}
//color transition function
function transition(usrPick, usrResult, comPick, compResult){   
    userRockButton.removeEventListener('click', playGame);
    userPaperButton.removeEventListener('click', playGame);
    userScissorsButton.removeEventListener('click', playGame);
    userRockButton.removeEventListener('mouseover', userHover);
    userPaperButton.removeEventListener('mouseover', userHover);
    userScissorsButton.removeEventListener('mouseover', userHover);
    switch(usrPick){
        case "piedra": userRockButton.classList.add(`${usrResult}`);
        break;
        case "papel": userPaperButton.classList.add(`${usrResult}`);
        break;
        case "tijera": userScissorsButton.classList.add(`${usrResult}`);
        break;
    }
    switch(comPick){
        case "piedra": computerRockButton.classList.add(`${compResult}`);
        break;
        case "papel": computerPaperButton.classList.add(`${compResult}`);
        break;
        case "tijera": computerScissorsButton.classList.add(`${compResult}`);
        break;
    }
}
//remove transition color function
function removeTransition(){
    this.classList.remove('win');
    this.classList.remove('lost');
    this.classList.remove('draw');
    userRockButton.addEventListener('click', playGame);
    userPaperButton.addEventListener('click', playGame);
    userScissorsButton.addEventListener('click', playGame);
    userRockButton.addEventListener('mouseover', userHover);
    userPaperButton.addEventListener('mouseover', userHover);
    userScissorsButton.addEventListener('mouseover', userHover);
}
//game main function
function playGame(){
    let userOption=this.dataset.option;
    let compOption=computerOption();
    if(userScore<5&&computerScore<5){
        //if user wins
        if((userOption==='piedra'&&compOption==='tijera')||
            (userOption==='papel'&&compOption==='piedra')||
            (userOption==='tijera'&&compOption==='papel')){
                transition(userOption, 'win', compOption, 'lost');
                userScore++;
                round++;
                userScoreBox.textContent=`${userScore}`;
                logArray.push(`¡GANASTE el round ${round}!, ${userOption} mata ${compOption}, ${userScore}-${computerScore}`);
                showLog();
                if(userScore===5){
                    logArray.push(`¡GANASTE EL JUEGO, FELICIDADES! El resultado final es ${userScore}-${computerScore}`);
                    showLog();
                    userWinSound.play();
                    logArray.push(`PRESIONA LA TECLA 'F5' PARA REINICIAR LA PARTIDA.`);
                    showLog();
                }
                
        }
        //if computer wins
        else if((compOption==='piedra'&&userOption==='tijera')||
            (compOption==='papel'&&userOption==='piedra')||
            (compOption==='tijera'&&userOption==='papel')){
                transition(userOption, 'lost', compOption, 'win');
                computerScore++;
                round++;
                computerScoreBox.textContent=`${computerScore}`;
                logArray.push(`¡PERDISTE el round ${round}!, ${compOption} mata ${userOption}, ${userScore}-${computerScore}`);
                showLog();
                if(computerScore===5){
                    logArray.push(`¡HAS PERDIDO EL JUEGO! El resultado final es ${userScore}-${computerScore}`);
                    showLog();
                    userLoseSound.play();
                    logArray.push(`PRESIONA LA TECLA 'F5' PARA REINICIAR LA PARTIDA.`);
                    showLog();
                }
        }
        //if draws
        else{
            transition(userOption, 'draw', compOption, 'draw');
            round++;
            logArray.push(`¡EMPATE en el round ${round}!, ambos usaron ${userOption}, ${userScore}-${computerScore}`);
            showLog();
        }
    }
}
//colors the botton white when the user hovers
userRockButton.addEventListener('mouseover', userHover);
userPaperButton.addEventListener('mouseover', userHover);
userScissorsButton.addEventListener('mouseover', userHover);
//colors the botton green again when the user unhovers
userRockButton.addEventListener('mouseleave', removeHover);
userPaperButton.addEventListener('mouseleave', removeHover);
userScissorsButton.addEventListener('mouseleave', removeHover);
//remove transition for the user button
userRockButton.addEventListener('transitionend', removeTransition);
userPaperButton.addEventListener('transitionend', removeTransition);
userScissorsButton.addEventListener('transitionend', removeTransition);
//remove transition for the computer button
computerRockButton.addEventListener('transitionend', removeTransition);
computerPaperButton.addEventListener('transitionend', removeTransition);
computerScissorsButton.addEventListener('transitionend', removeTransition);
//starts the game
userRockButton.addEventListener('click', playGame);
userPaperButton.addEventListener('click', playGame);
userScissorsButton.addEventListener('click', playGame);
