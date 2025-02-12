class DetectionBox { 
    constructor(player = null, x, y, w, h, angle = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.transparency = 0;
        this.strokeSize = 2;
        this.aiHit;

        if(player != null) {
            this.player = player;
            this.enemies = [];
        } else {
            this.player = null;
            this.enemies = [];
        }
    }

    //make a box just for players
    static forPlayer(player, x, y, w, h) {
        return new DetectionBox(player, x, y, w, h);
    }

    //making a box for for Enemies;
    static forEnemies(enemies, x, y, w, h) {
        let box = new DetectionBox(null, x, y, w, h);
        box.enemies = enemies;
        return box;
    }

    //draw detection box
    create() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        stroke('red');
        strokeWeight(this.strokeSize);
        fill(0, this.transparency); 
        rectMode(CENTER);
        rect(0, 0, this.w, this.h); 
        pop();
    }

    //remove the border;
    setTransparent(){
        this.strokeSize = 0;
        this.transparency = 0;
    }

    //set border size
    setStroke(inputSize){
        this.strokeSize = inputSize;
    }

    //@returns true if enemey is in box
    check() {
        let touchingPlayer = this.player ? this.checkCollision(this.player) : false;
        let touchingEnemy = this.enemies ? this.enemies.some(enemy => this.checkCollision(enemy)) : false;

        return touchingPlayer || touchingEnemy;
    }

    //get the entity that was hit
    getEntityHit(){
        return this.aiHit;
    } 

    // @returns true if enemey is in box
    checkCollision(entity) {
        let entityX = entity.getX();
        let entityY = entity.getY();

        let dx = entityX - this.x;
        let dy = entityY - this.y;

       //rotate the entitys position to match the detection boxs rotation (for sword)
        let rotatedX = cos(-this.angle) * dx - sin(-this.angle) * dy;
        let rotatedY = sin(-this.angle) * dx + cos(-this.angle) * dy;

        //check if its whithin the 
        let withinX = abs(rotatedX) <= this.w / 2;
        let withinY = abs(rotatedY) <= this.h / 2;

        //if so return true
        if(withinX && withinY) {
            this.aiHit = entity;
            return true;
        }

        return false;
    }
}
