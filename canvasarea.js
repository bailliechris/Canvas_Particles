class CanvasArea{
    constructor(width, height, domId, color){
        this.width = width;
        this.height = height -100;
        this.color = color;
        this.id = document.getElementById(domId);
        this.context = this.id.getContext("2d");
        this.init();
    }

    init(){
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight -100;

            this.id.width = this.width;
            this.id.height = this.height;
        });

        this.id.style.background=this.color;

        this.id.width = this.width;
        this.id.height = this.height;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    draw(words) {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.rect(0,0, this.width, this.height);
        this.context.fill();
        this.context.closePath();

        this.context.font='50px Tahoma';
        this.textBaseLine = "hanging";
        this.context.textAlign = "center";
        this.context.strokeText(words, this.width/2, this.height/2);
    }
}