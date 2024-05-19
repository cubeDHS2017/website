const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 0,
    y: 0,
    width: 4,
    height: 4,
    speed: 1,
    dy: 0,
    gravity: 0.5,
    jumpPower: -5,
    isJumping: false,
    color: 'green'
};

const ground = {
    x: 0,
    y: 350,
    width: canvas.width,
    height: 50,
    color: 'green'
};

const keys = {
    right: false,
    left: false,
    up: false
};



document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyD') keys.right = true;
    if (e.code === 'KeyA') keys.left = true;
    if (e.code === 'KeyW' && !player.isJumping) {
        player.isJumping = true;
        player.dy = player.jumpPower;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyD') keys.right = false;
    if (e.code === 'KeyA') keys.left = false;
});

function update() {
        if (keys.right) player.x += player.speed;
        if (keys.left) player.x -= player.speed;


        // Boundary checks
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

        player.y += player.dy;
        if (player.y + player.height < canvas.height) {
        player.dy += player.gravity;
        } else {
        player.y = canvas.height - player.height;
        player.isJumping = false;
        }

        if (player.y + player.height >= ground.y) {
        player.y = ground.y - player.height;
        player.isJumping = false;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        requestAnimationFrame(update);
}

function draw() {
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

update();