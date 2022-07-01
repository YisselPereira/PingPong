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
}
function draw(ctx,element){
    if(element!=null){
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
        }
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

    }
    down(){

    }
    up(){

    }
}
window.addEventListener("load", main)
function main(){
    var board = new Board(800,400);
    console.log(board);
    var canvas = document.getElementById('canvas')
    var board_view = new Boardview(canvas,board);
    var bar = new Bar(10,100,40,100,board);
    var bar2 = new Bar(750,100,40,100,board);
    board_view.draw();
}