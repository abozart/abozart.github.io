//myArrowFunc = (domObj) => alert('shawday '+domObj.getAttribute('data-mood'));
var ages = [2,10,24,17,18,399,23];
checkAge = (age) => age >= 200;
console.log(ages.some(checkAge)); //will return true because 399 > 200


//this var keeps track of who's turn it is
let activePlayer = 'X';
//This array stores an array of moves. We use this to determine win conditions.
let selectedSquares = [];

//this func is for placing an x or o in a square
function placeXOrO(squareNumber){
    //This condition ensures a square hasn't been selected already
    //The .some() method is used to check each element of the selectSquare array
    //to see if it contains the square number clicked on.
    if(!selectedSquares.some(element => element.includes(squareNumber))){
        //This variable retrieves the HTML element id that was clicked
        let select = document.getElementById(squareNumber);
        //This condition checks who's turn it is
        if(activePlayer ==='X'){
            //If activePlayer   == X, the x.png is placed in HTML
            select.style.backgroundImage = 'url("./img/x.png")'
        }else{
            select.style.backgroundImage = 'url("./img/o.png")'
        }

        //squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing the active player.
        if (activePlayer === 'X') { activePlayer = 'O'; }
        else { activePlayer = 'X'; }

        //This function plays placement sound.
        audio('./media/place.mp3');
        //This condition checks to see if it is the computers turn.
        if (activePlayer === 'O'){
            //disable clicking for computer's turn
            disableClick();
            //This function waits 1 second before the computer places an image and enables click.
            setTimeout(function(){computersTurn();}, 1000);
        }
        //Returning true is needed for our computersTurn() function work
        return true;
    }
    //This function results in a random square being selected by the computer.
    function computersTurn(){
        //This bool is needed for our while loop/
        let success = false;
        //This var stores a random number 0-8.
        let pickASquare;
        //This condition allows our while loop to keep trying if a square is selected already.
        while(!success){
            //A Random # between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random # evaluated returns true, the square hasn't been selected yet.
            if(placeXOrO(pickASquare)){
                //This line calls the function.
                placeXOrO(pickASquare);
                //This changes our bool to true and ends the loop.
                success = true;
            };
        }
    }
}

//This function parses the selectedSquares [] to search for win conditions
//drawLine() function is called to draw a line on the screen if the condition is met.
function checkWinConditions(){
    if(arrayIncludes('0X','1X','2X')) { drawWinLine(50,100,558,100)}         // X 0, 1, 2 condition
    else if(arrayIncludes('3X','4X','5X')) { drawWinLine(50,304,558,304)}    // X 3, 4, 5 condition
    else if(arrayIncludes('6X','7X','8X')) { drawWinLine(50,508,558,508)}    // X 0, 1, 2 condition
    else if(arrayIncludes('0X','3X','6X')) { drawWinLine(100,50,100,558)}    // X 6, 7, 8 condition
    else if(arrayIncludes('1X','4X','7X')) { drawWinLine(304,50,304,558)}    // X 1, 4, 7 condition
    else if(arrayIncludes('2X','5X','8X')) { drawWinLine(508,50,508,558)}    // X 2, 5, 8 condition
    else if(arrayIncludes('6X','4X','2X')) { drawWinLine(100,508,510,90)}    // X 6, 4, 2 condition
    else if(arrayIncludes('0X','4X','8X')) { drawWinLine(100,100,520,520)}   // X 0, 4, 8 condition
    else if(arrayIncludes('0O','1O','2O')) { drawWinLine(50,100,558,100)}    // O 0, 1, 2 condition
    else if(arrayIncludes('3O','4O','5O')) { drawWinLine(50,304,558,304)}    // O 3, 4, 5 condition
    else if(arrayIncludes('6O','7O','8O')) { drawWinLine(50,508,558,508)}    // O 6, 7, 8 condition
    else if(arrayIncludes('0O','3O','6O')) { drawWinLine(100,50,100,558)}    // O 0, 3, 6 condition
    else if(arrayIncludes('1O','4O','7O')) { drawWinLine(304,50,304,558)}    // O 1, 4, 7 condition
    else if(arrayIncludes('2O','5O','8O')) { drawWinLine(508,50,508,558)}    // O 2, 5, 8 condition
    else if(arrayIncludes('6O','4O','2O')) { drawWinLine(100,508,510,90)}    // O 6, 4, 2 condition
    else if(arrayIncludes('0O','4O','8O')) { drawWinLine(100,100,520,520)}   // O 0, 4, 8 condition
    else if(selectedSquares.length >= 9){
        //This function plays the tie game sound.
        audio('../media/tie.mp3');
        //This func sets a .5s timer before the resetGame is called.
        setTimeout(function(){resetGame(); },500);
    }

    //This function checks if an array includes 3 strings. It is used to check for each win condition.
    function arrayIncludes(squareA,squareB,squareC){
        //these 3 vars will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //If the 3 vars we pass are all included in our array then true is returned and our
        // else if condition executes the drawLine() func.
        if(a === true && b === true && c === true){ return true; }
    }
}

function audio(audioURL){
    //we create a new audio object and we pass the path as a parameter.
    let audio = new Audio(audioURL);
    //play method plays our sound
    audio.play();
}

//this function makes our body element temporarily unclickable
function disableClick(){
    //this makes our body unclickable
    body.style.pointerEvents = 'none';
    //this makes our body clickable again after 1 second
    setTimeout(function() { body.style.pointerEvents = 'auto'; }, 1000);
}

//this func utilizes HTML canvas to draw win lines.
function drawWinLine(coordX1,coordY1,coordX2, coordY2){
    //this line accesses our HTML canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on our canvas.
    const c = canvas.getContext('2d');
    //this line indicated where the start of a lines x axis is.
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

    //this func interacts with the canvas
    function animateLineDrawing(){
        //This var creates a loop.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from the last loop iteration.
        c.clearRect(0,0,608,608);
        //this method starts a new path.
        c.beginPath();
        //this method moves us to a starting point in our line.
        c.moveTo(x1,y1);
        //this method indicates the end point of our line
        c.lineTo(x,y);
        //this method sets the width of our line.
        c.lineWidth = 10;
        //this sets the color of our line
        c.strokeStyle = 'rgba(70,255,33,.8)';
        //this method draws everything we laid out above
        c.stroke();
        //this condition checks if we've reached the endpoints.
        if(x1 <= x2 && y1 <= y2){
            //this cond adds 10 to the previous x endpoint
            if(x < x2){ x += 10; }
            //this cond adds 10 to the previous y endpoint
            if(y < y2){ y += 10; }
            //this cond is similar to the one above which is needed for the 6, 4, and 2 win conditions.
            if(x >= x2 && y >- y2){ cancelAnimationFrame(animationLoop); }
        }
    }

    //this func clears our canvas after our win line is drawn
    function clear(){
        //this line starts our animation loop.
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas.
        c.clearRect(0,0,608,608);
    }

    //this line disallows clicking while the win sound if playing
    disableClick();
    //this line plays the win sound.
    audio('./media/winGame.mp3');
    //this line calls our main animation loop.
    animateLineDrawing();
    //this line waits 1s then clears canvaas, resets game, allows clicking again.
    setTimeout(function(){ clear(); resetGame(); }, 1000);
}

//this func resets the game in the event of a tie or a 
function resetGame(){
    //this loop iterates through each HTML square element
    for(let i = 0; i < 9; i++){
        //this var gets the HTML element i
        let square = document.getElementById(String(i));
        //this removes our elements backgroundimage.
        square.style.backgroundImage = '';
    }
    //this resets our array so it is empty and we can start over.
    selectedSquares = [];
}
