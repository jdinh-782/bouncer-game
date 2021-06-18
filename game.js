let switchWindow = true;    

if (!switchWindow)
{
    
}

if (switchWindow)
{
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    //draw the ball
    let ballX = canvas.width / 2; //x-coordinate of ball
    let ballY = canvas.height - 45; //y-coordinate of ball
    let balldx = 3; //velocity of ball (x-direction)
    let balldy = -3; //velocity of ball (y-direction)
    let ballRadius = 25; //radius of the ball

    let ballImg = new Image();
    ballImg.src = "ball.gif";
    ballImg.width = 75;
    ballImg.height = 75;
    ctx.drawImage(ballImg, ballX, ballY, 75, 75); 
    ctx.fill();


    //draw the paddle
    let paddleX = (canvas.width - 200) / 2;

    let paddleImg = new Image();
    paddleImg.src = "paddle.png";
    paddleImg.width = 175;
    paddleImg.height = 35;
    ctx.drawImage(paddleImg, 150, 150, 225, 45);
    ctx.fill();


    function drawPaddle()
    {
        ctx.beginPath();
        // ctx.rect(paddleX, canvas.height - 35, 200, 35);
        ctx.drawImage(paddleImg, paddleX, canvas.height - 45, 225, 45);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    };

    function drawBall()
    {
        ctx.beginPath();
        // ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
        ctx.drawImage(ballImg, ballX, ballY, 75, 75);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // canvas.clearRect(0, 0, 750, 900);
        // canvas.drawImage(ballImg, ballX, ballY, 75, 75);
        // canvas.fill();

        // ballX += balldx;
        // ballY += balldy;
    };

    function init()
    {
        ctx.clearRect(0, 0, 750, 900);
        drawBall();
        drawPaddle();

        if ((ballX + balldx > (canvas.width - ballRadius - 50)) || (ballX + balldx < ballRadius - 40))
            balldx = -balldx;
        
        if (ballY + balldy < ballRadius - 25)
            balldy = -balldy;
        
        //detect collision between ball and paddle
        else if (ballY + balldy > (canvas.height - ballRadius))
        {
            if (ballX > paddleX && ballX < (paddleX + 225))
            {
                changeScore();
                changeSpeed();
                balldy = -balldy;
            }
                
            else
            {
                // console.log('game over');
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
                
        }
        
        ballX += balldx;
        ballY += balldy;
    };

    document.addEventListener("keydown", movePaddle);

    function movePaddle(e)
    {
        switch (e.key)
        {
            // case 'ArrowUp':
            // {
            //     paddleY -= 35;
            //     // console.log('up');
            //     break;
            // }
            // case 'ArrowDown':
            // {
            //     paddleY += 35;
            //     // console.log('down');
            //     break;
            // }
            case 'ArrowLeft':
            {
                paddleX -= 40;
                // console.log('left');
                break;
            }
            case 'ArrowRight':
            {
                paddleX += 40;
                // console.log('right');
                break;
            }
        }
    };

    let score = 0;

    function changeScore()
    {
        score++;
        document.getElementById("score").innerHTML = "Score: " + String(score);
    };

    function changeSpeed()
    {
        if (score % 3 == 0 && score >= 3)
        {
            balldx += 1;
            balldy -= 1;
        }
    };

    let interval = setInterval(init, 10);
}

