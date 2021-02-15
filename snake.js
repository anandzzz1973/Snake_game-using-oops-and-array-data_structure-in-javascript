function init()
{
    canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
    cs = 66;
    game_over=false;
    score=0;

    food = getRandomFood();

    //food image 
    food_image = new Image();
    food_image.src = "fruti.jpg";

    // trophy image
    trophy = new Image();
    trophy.src = "trophy.jpg";
    
    snake = {
		init_len:4,
		color:"blue",
		cells:[],
		direction:"down",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
        },
        
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
        },

        updateSnake:function(){
            // this.cells.pop();

            var headx=this.cells[0].x;
            var heady=this.cells[0].y;
            var X=headx,Y=heady;

            if(X==food.x && Y==food.y)
            {
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }
            else
            {
                this.cells.pop();
            }

            if(this.direction=="right")
            X=headx+1;
            else if(this.direction=="left")
            X=headx-1;
            else if(this.direction=="up")
            Y=heady-1;
            else
            Y=heady+1;

            this.cells.unshift({x:X,y:Y});

            /*Write a Logic that prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

        }
    }

    snake.createSnake();

    function keypressed(e){
        if(e.key=="ArrowDown")
        snake.direction="down";
        else if(e.key=="ArrowUp")
        snake.direction="up";
        else if(e.key=="ArrowRight")
        snake.direction="right";
        else
        snake.direction="left";

        console.log(this.direction);
    }

    document.addEventListener('keydown',keypressed);
}

function draw()
{
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "40px Roboto";
	pen.fillText(score,50,50);
}

function update()
{
    snake.updateSnake();
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food
}

function gameloop()
{
    if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
    draw();
	update();
}

init();

var f=setInterval(gameloop,200);