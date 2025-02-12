class EnemyAI {
    constructor(client, aiSiz, speed, health) {
      // AI Variables
      this.aiPos = createVector(random(width), random(height)); // random start pos
      this.aiVel = createVector(0, 0);
      this.aiDecPos = createVector(this.aiPos.x, this.aiPos.y);
  
      // Player variables
      this.pTarget = client;
      this.aiSize = aiSiz;
      this.playerSize = client.getSize();
      this.speed = speed;
      this.aiHealth = health;
      this.aiCol = 'red';
  
      // Detection radius
      this.aiRadius = 150;
      this.detected = false;
      this.isAlive = true; 

      // Damaged 
      this.isDamanged = false;
    }
    
    getSize(){
        return this.aiSize;
    }

    getX() {
      return this.aiPos.x;
    }

    getY() {
        return this.aiPos.y;
    }

    setColor( newCol ){
        this.aiCol = newCol;
    }

    damage(){
        this.aiHealth -= 10;
    }

    update() {
      if (!this.isAlive) return;
  
      // calculate distance to player
      let distanceToPlayer = dist(this.pTarget.x, this.pTarget.y, this.aiPos.x, this.aiPos.y);
      
      // update detection status
      this.detected = distanceToPlayer < (this.playerSize / 2 + this.aiSize / 2 + this.aiRadius);
        
      // if detected, move toward player
      if (this.detected) {
        let playerPos = createVector(this.pTarget.x, this.pTarget.y);
        let direction = p5.Vector.sub(playerPos, this.aiPos);
        direction.setMag(this.speed); 
        this.aiPos.add(direction); // move AI toward player
      }
    }
  
    draw() {
      if (!this.isAlive) return;
  
      // Draw AI (enemy)
      fill(this.aiCol);
      ellipse(this.aiPos.x, this.aiPos.y, this.aiSize, this.aiSize);
  
      // Draw AI Detection Circle
      fill(this.detected ? color(0, 255, 0, 50) : color(255, 0, 0, 50));
      ellipse(this.aiPos.x, this.aiPos.y, this.aiRadius * 2, this.aiRadius * 2);
    }
  }