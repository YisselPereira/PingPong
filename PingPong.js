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
            var elements = this.bars.map(bar => bar);
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
        this.speed_x = 3;
        this.board.ball = this;
        this.kind = "circle";
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;
    }
    move(){
        this.x += this.speed_x * this.direction;
        this.y += this.speed_y;
    }
    get width(){
        return this.radius * 2;
    }
    get height(){
        return this.radius * 2;
    }
    collisions(bar){
        //Reacciona a la colision con una barra que recibe como parametro
        var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;
        var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
        this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
        this.speed_y = this.speed * -Math.sin(this.bounce_angle);
        this.speed_x = this.speed * Math.cos(this.bounce_angle);

        if(this.x > (this.board.width / 2)) this.direction = -1;
        else this.direction = 1;
    
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
        if(this.board.playing){
        this.clean();
        this.draw();
        this.check_collisions();
        this.board.ball.move();
        }
    }
    check_collisions(){
        this.board.bars.forEach(bar=>{
            if(hit(bar, this.board.ball)){
                this.board.ball.collisions(bar);
            }
        })
    }
}
function hit(a,b){
    // Revisa si a colisiona con b
    var hit = false;
    //Colisiones horizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        //Colisiones verticales
        if(b.y + b.height >= a.y && b.y < a.y + a.height){
            hit = true;
        }
    }
    //Colision de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            hit = true;
        }
    }
    //Colision de b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            hit = true;
        }
    }
    return hit;
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
    console.log(ev.keyCode);
    if(ev.keyCode== 38){ 
        ev.preventDefault(); 
        bar2.up();
    }
    else if(ev.keyCode == 40){
        ev.preventDefault();
        bar2.down();
    }
    else if(ev.keyCode == 87){
        ev.preventDefault();
        bar.up();
    }
    else if(ev.keyCode == 83){
        ev.preventDefault();
        bar.down();
    }
    else if(ev.keyCode == 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }
})
board_view.draw();
window.requestAnimationFrame(controller);
function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);
} 
