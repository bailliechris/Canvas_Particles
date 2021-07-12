class Particle{
    constructor(x, y, sx, sy, size, life, color) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.life = life;
        this.startLife = life;
        this.size = {
            x: size.x,
            y: size.y
        }
        // As RGBA
        this.color = color;
    }

    draw(context) {
        if(this.life > 0) {
            this.color[3] = (this.life/this.startLife) * 100;
            context.beginPath();
            // Circle!
            context.arc(this.x, this.y, this.size.x, 0, Math.PI*2, false);
            context.fillStyle = `rgba(` + this.color.toString() +`)`;
            context.shadowBlur = 10;
            context.shadowColor = "black";
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            
            context.fill();
            context.closePath();
        }

        return context;
    }

    // 0.1 for gravity (slowish)
    // bounce of 2 - reasonable.
    move(gravity, bounce, width, height) {
        if(this.life > 0) {
            this.life -=1;
            this.x += this.sx;
            this.y += this.sy;
            this.sy += gravity;
    
            if(this.y >= height){
                this.y = height - (this.size.y*2);
                this.sy = -this.sy+bounce;
            }
    
            if(this.x >= width){
                this.x = width - (this.size.x*2);
                this.sx = -this.sx+bounce;
            }
    
            if(this.x <= 0){
                this.x = 0 + (this.size.x*2);
                this.sx = -this.sx+bounce;
            }

            /*
            if(this.y <= 0){
                this.y = 0 + (this.size.y*2);
                this.sy = -this.sy+bounce;
            }*/
    
        }
    }

    revive(x, y, sx, sy, size, life, color){
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.life = life;
        this.startLife = life;
        this.size = {
            x: size.x,
            y: size.y
        }
        // As RGBA
        this.color = color;
    }
}