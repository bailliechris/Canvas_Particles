class CanvasManager{
    constructor(width, height, domID, color, amount){
        this.particleList = [];
        this.colorListIndex = 0;
        this.colorList = [[255, 42, 155], [0, 25, 152], [0, 253, 153], [252, 187, 0]]
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
            this.canvas.draw("Press Space or Tap");
    
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
                0,
                [...this.colorList[this.colorListIndex], 0]
            );
            this.particleList.push(p);
        }
    }

    inputListeners() {
        document.addEventListener('keyup', (event) => {
            if (event.key === " ") {
                this.reviveAllDeadParticles(this.canvas.width/2, this.canvas.height-10);
            }
        })

        document.getElementById("particles").addEventListener('touchstart', (event) => {
            if (event.touches.length > 0) {
                this.reviveAllDeadParticles(event.touches[0].pageX, event.touches[0].pageY);
            }
        })

        document.getElementById("particleslider").addEventListener('change', (event) => {
            this.adjustAmountOfParticles(event.target.value);
        })

        document.getElementById("fewer").addEventListener('click', () => {
            let current = parseInt(document.getElementById("particleslider").value, 10);

            current -= 50;

            if (current >= 0) {
                document.getElementById("particleslider").value = current;
                this.adjustAmountOfParticles(current);
            }
        })

        document.getElementById("more").addEventListener('click', () => {
            let current = parseInt(document.getElementById("particleslider").value, 10);

            current += 50;

            if (current < 1000) {
                document.getElementById("particleslider").value = current;
                this.adjustAmountOfParticles(current);
            }
        })
    }

    reviveAllDeadParticles(x, y){

        this.colorListIndex ++;

        if (this.colorListIndex > this.colorList.length -1) {
            this.colorListIndex = 0;
        }

        this.particleList.forEach((particle) => {
            if(particle.life<=0) {
                const life = this.random(25,100);

                particle.revive(                
                    x,
                    y,
                    this.random(-50,50),
                    this.random(-8, -50),
                    {x:this.random(2,10), y:this.random(2,10)},
                    life,
                    [...this.colorList[this.colorListIndex], `${life}%`]
                );
            }
        })
    }

    random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    adjustAmountOfParticles(amount) {
        if (amount <= this.particleList.length) {
            this.particleList = this.particleList.slice(0, amount);
        } else {
            const difference = amount - this.particleList.length;

            this.createParticles(difference);
        }
    }
}