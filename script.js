let game = {
    width: 640,
    height: 360,
    ctx: undefined,
    platform: undefined,
    sprites: {
        background: undefined,
        platform: undefined,
    },
    start: function() {
        this.init();
        this.load();
        this.run();
    },
    init: function () {
        let canvas = document.getElementById('game');
        this.ctx = canvas.getContext('2d');
    },
    load: function () {
        const sprites = this.sprites;
        for(let key in sprites) {
            sprites[key] = new Image();
            sprites[key].src = `images/${key}.jpg`;
        }
    },
    render: function() {
        const sprites = this.sprites;
        this.ctx.clearRect(0, 0, this.width, this.hight);
        this.ctx.drawImage(sprites.background, 0, 0);
        this.ctx.drawImage(sprites.platform, this.platform.x, this.platform.y);
    },
    run: function() {
        this.render();
        window.requestAnimationFrame(() => {
            this.run();
        });
    }
};
game.platform = {
    x: 300,
    y: 400,
}
window.addEventListener("load", () => {
    game.start();
});
