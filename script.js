let game = {
    width: 640,
    height: 360,
    ctx: undefined,
    platform: undefined,
    ball: undefined,
    rows: 4,
    cols: 8,
    blocks: [],
    sprites: {
        background: undefined,
        platform: undefined,
        ball: undefined,
        block: undefined,
    },
    create: function () {
        for(let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push({
                    x: 68 * col + 50,
                    y: 38 * row + 35,
                    width: 64,
                    height: 32
                });
            }
        }
        //block
    },
    start: function() {
        this.init();
        this.load();
        this.create();
        this.run();
    },
    init: function () {
        let canvas = document.getElementById('game');
        this.ctx = canvas.getContext('2d');
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.platform.dx = -this.platform.velocity;
                break;
                case 39:
                    this.platform.dx = this.platform.velocity;
                break;
                case 32:
                    this.platform.releaseBall();
                break;
            }
        });
        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 37: case 39:
                    this.platform.stop();
                break;
            }
        });
        document.getElementById('pause').addEventListener('click', function () {
            console.log('dasdasd');
        });
    },
    load: function () {
        const sprites = this.sprites;
        for(let key in sprites) {
            sprites[key] = new Image();
            sprites[key].src = `images/${key}.png`;
        }
    },
    render: function() {
        const sprites = this.sprites;
        const ball = this.ball;
        this.ctx.clearRect(0, 0, this.width, this.hight);
        this.ctx.drawImage(sprites.background, 0, 0);
        this.ctx.drawImage(sprites.platform, this.platform.x, this.platform.y);
        this.ctx.drawImage( sprites.ball, ball.width * ball.frame, 0, ball.width, ball.height, ball.x, ball.y, ball.width, ball.height);
        this.blocks.forEach( block => {
            this.ctx.drawImage(sprites.block, block.x, block.y);
        });
    },
    update: function() {
        if(this.platform.dx) {
            this.platform.move();
        }
        if(this.platform.ball === false) {
            this.ball.move();
        }
    },
    run: function() {
        this.update();
        this.render();
        window.requestAnimationFrame(() => {
            this.run();
        });
    }
};
game.ball = {
    width: 22,
    height: 22,
    frame: 0,
    x: 340,
    y: 278,
    dx: 0,
    dy: 0,
    velocity: 3,
    jump: function () {
        this.dy = -this.velocity;
        this.dx = -this.velocity;
    },
    move: function () {
        this.x += this.dx;
        this.y += this.dy;
    }
}
game.platform = {
    x: 300,
    y: 300,
    dx: 0,
    velocity: 5,
    ball: game.ball,
    move: function () {
        this.x += this.dx;
        if(this.ball) {
            this.ball.x += this.dx;
        }
    },
    stop: function () {
        this.dx = 0;
        if(this.ball) {
            this.ball.dx = 0;
        }
    },
    releaseBall: function () {
        if(this.ball) {
            this.ball.jump();
            this.ball = false;
        }
    }
};

window.addEventListener("load", () => {
    game.start();
});
