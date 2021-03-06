class CanvasManager{
    constructor(width, height, domID, color, amount){
        this.particleList = [];
        this.canvas = new CanvasArea(width, height, domID, color);
        this.createParticles(amount);
        this.inputListeners();
    }

    begin(){
        setInterval(() => {
            this.canvas.clear();
            this.canvas.context.shadowBlur = 0;
            this.canvas.context.shadowOffsetX = 0;
            this.canvas.context.shadowOffsetY = 0;
            this.canvas.context.shadowColor = "black";
            this.canvas.draw("Press Space");
    
            this.particleList.forEach((particle) => {
                particle.move(0.5, 5, this.canvas.width, this.canvas.height);
                this.canvas.context = particle.draw(this.canvas.context);
            });
    
        }, 50);
    }

    createParticles(amount){
        for(let i=0; i<amount; i++){
            let p = new Particle(
                this.canvas.width/2,
                this.canvas.height-10,
                this.random(-50,50),
                this.random(-8, -50),
                {x:this.random(2,10), y:this.random(2,10)},
                this.random(25,100),
                [210, 60, 80, 1]
            );
            this.particleList.push(p);
        }
    }

    inputListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.key === " ") {
                this.reviveAllDeadParticles();
            }
        })
    }

    reviveAllDeadParticles(){
        this.particleList.forEach((particle) => {
            if(particle.life<=0) {
                particle.revive(                
                    this.canvas.width/2,
                    this.canvas.height-10,
                    this.random(-50,50),
                    this.random(-8, -50),
                    {x:this.random(2,10), y:this.random(2,10)},
                    this.random(25,100),
                    [210, 60, 80, 1]
                );
            }
        })
    }

    random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}