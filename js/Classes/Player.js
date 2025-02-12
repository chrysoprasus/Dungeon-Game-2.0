class Player {
    constructor() {
        this.x = 300;
        this.y = 550;
        this.width = 30;
        this.height = 30;
        this.color = "blue";
        this.speed = 5;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.height, this.width);  // draw player
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX( newX ){
        this.x = newX;
    }

    setY( newY ){
        this.y = newY;
    }

    setSize( newSize ){
        this.width = newSize;
        this.height = newSize;
    }

    setSize( newWidth, newHeight ){
        this.width = newWidth;
        this.height = newHeight;
    }

    getSize(){
        return this.width;
    }

    setColor( newCol ){
        this.color = newCol;
    }

    move() {
        // Player Movement---------------
        let moveX = 0;
        let moveY = 0;

        if (keyIsDown(87)) {
            moveY -= 1;
        }
        if (keyIsDown(83)) {
            moveY += 1;
        }
        if (keyIsDown(65)) {
            moveX -= 1;
        }
        if (keyIsDown(68)) {
            moveX += 1;
        }

        if (moveX !== 0 || moveY !== 0) {
            let magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX = (moveX / magnitude) * this.speed;
            moveY = (moveY / magnitude) * this.speed;
        }

        this.x += moveX;
        this.y += moveY;

        //block from leaving map
        this.x = constrain(this.x, this.width / 2, width - this.width / 2);
        this.y = constrain(this.y, this.height / 2, height - this.height / 2);
        // End Player Movement ---------------

        
        
    }
};
