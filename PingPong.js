class Board {
    constructor (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
    }
        getElements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements
        }
}
class Ball{
    constructor(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speed_y = 0;
        this.speed_x = 0;
        this.board.ball = this;
        this.kind = "circle";
    }
}
class Boardview{
    constructor(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
    draw(){
        this.board.getElements().forEach(element => {
            draw(this.ctx,element)
        });
    }
    clean(){
        this.ctx.clearRect(0,0,this.board.width,this.board.height);
    }
    play (){
        this.clean();
        this.draw();
    }
}
function draw(ctx,element){

    switch(element.kind){
        case "rectangle":
            ctx.fillRect(element.x,element.y,element.width,element.height);
            break;
        case "circle" :
            ctx.beginPath();
            ctx.arc(element.x,element.y,element.radius,0,7);
            ctx.fill();
            ctx.closePath();
            break;
    }
}
class Bar {
    constructor(x, y, width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }
    toString(){
        return "x: " + this.x + "y: " + this.y; 
    }
    down(){
        this.y += this.speed;
    }
    up(){
        this.y -= this.speed;
    }
}
window.addEventListener("load", controller);
var board = new Board(800,400);
console.log(board);
var canvas = document.getElementById('canvas')
var board_view = new Boardview(canvas,board);
var bar = new Bar(10,100,30,150,board);
var bar2 = new Bar(760,100,30,150,board);
var ball = new Ball(400, 200, 10, board);

document.addEventListener("keydown", function(ev){
    ev.preventDefault();
    console.log(ev.keyCode);
    if(ev.keyCode== 38){  
        bar2.up();
    }
    else if(ev.keyCode == 40){
        bar2.down();
    }
    else if(ev.keyCode == 87){
        bar.up();
    }
    else if(ev.keyCode == 83){
        bar.down();
    }
})
window.requestAnimationFrame(controller);
function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);
} 
