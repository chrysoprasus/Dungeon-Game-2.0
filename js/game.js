//vars
let player;
let swordImg;
let swordLength = 50; 
let enemies = [];
let testBox;

let stage = 0; //0 = loading, 1 = level 1,


//stop right click
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});

//preload images
function preload() {
    swordImg = loadImage('assets/sword1.png');
}



//game itself
function setup() {
    createCanvas(1000, 600);
    player = new Player();

    //spawn 3 enemeies
    for (let i = 0; i < 3; i++) {
        enemies.push(new EnemyAI(player, 30, 2, 100));
    }

    testBox = DetectionBox.forPlayer(player, 20, 20, 100, 100);
    enemyOnlyBox = DetectionBox.forEnemies(enemies, 200, 200, 100, 100);

    //sword hitbox
    let angle = atan2(mouseY - player.y, mouseX - player.x);
    let swordX = player.x + cos(angle) * swordLength;
    let swordY = player.y + sin(angle) * swordLength;
    swordHitBox = DetectionBox.forEnemies(enemies,  swordX, swordY, swordLength, 30, angle);
    
    updateSwordHitBox();
}

function draw() {
    background(220);

    //Player Stuff ----------------------
    player.move();
    player.display(); 


    //detection boxes
    testBox.create();
    enemyOnlyBox.create();

    let angle = atan2(mouseY - player.y, mouseX - player.x);

    //update swordHitBox position 
    let swordX = player.x + cos(angle) * swordLength;
    let swordY = player.y + sin(angle) * swordLength;

    swordHitBox.x = swordX;
    swordHitBox.y = swordY;
    swordHitBox.angle = angle;  

    //draw hitbox
    updateSwordHitBox();
    swordHitBox.create();

    //testing hitboxes
    if(testBox.check()) {
        player.setColor('green');
    }else{
        player.setColor('blue');
    }

    if(enemyOnlyBox.check()) {
        console.log("Enemy in box!");
    }


    if(swordHitBox.check()){
        let victim = swordHitBox.getEntityHit();
        victim.setColor('yellow');
    }

    //Sword Start ----------------------
    push();
    translate(player.x, player.y);
    rotate(atan2(mouseY - player.y, mouseX - player.x) + HALF_PI);
    imageMode(CENTER);
    image(swordImg, 0, -swordLength / 2, 30, swordLength);
    pop();
    //Sword End ----------------------

    //enemy ----------------------
    for (let enemy of enemies) {
        enemy.update();
        enemy.draw();
    }

}

//Game fuctions ----------------------
function mousePressed(){
    if(mouseButton === LEFT){
        console.log("left clicked");
        player.setColor('red');
    } else if (mouseButton === RIGHT){
        console.log("right clicked")
        player.setColor('blue');
    }
}

// fixes the boxes pos to the image
function updateSwordHitBox() {
    let angle = atan2(mouseY - player.y, mouseX - player.x);

    let swordX = player.x + cos(angle) * swordLength * 0.5;
    let swordY = player.y + sin(angle) * swordLength * 0.5;

    if (!swordHitBox) {
        swordHitBox = DetectionBox.forEnemies(enemies, swordX, swordY, swordLength, 2, angle);
    } else {
        swordHitBox.x = swordX;
        swordHitBox.y = swordY;
        swordHitBox.angle = angle;
    }
}
