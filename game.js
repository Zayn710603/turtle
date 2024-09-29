const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let turtleX = 100; // 烏龜的初始X位置
let turtleY = canvas.height / 2; // 烏龜的初始Y位置
const turtleSpeed = 100;
let obstacles = [];
const obstacleWidth = 20;
const obstacleHeight = 100;
const obstacleSpeed = 1;
let gameRunning = false;

// 畫烏龜
function drawTurtle() {
    // 烏龜的頭和腳
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(turtleX, turtleY, 20, 0, Math.PI * 2); // 龜殼
    ctx.fill();
    ctx.closePath();

    // 頭部
    ctx.beginPath();
    ctx.arc(turtleX + 25, turtleY, 10, 0, Math.PI * 2); // 龜頭
    ctx.fillStyle = "darkgreen";
    ctx.fill();
    ctx.closePath();

    // 腳
    ctx.beginPath();
    ctx.arc(turtleX - 15, turtleY - 15, 5, 0, Math.PI * 2); // 左前腳
    ctx.arc(turtleX - 15, turtleY + 15, 5, 0, Math.PI * 2); // 左後腳
    ctx.arc(turtleX + 10, turtleY - 15, 5, 0, Math.PI * 2); // 右前腳
    ctx.arc(turtleX + 10, turtleY + 15, 5, 0, Math.PI * 2); // 右後腳
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

// 畫障礙物
function drawObstacles() {
    ctx.fillStyle = "brown";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

// 生成新的障礙物
function generateObstacle() {
    const yPosition = Math.random() * (canvas.height - obstacleHeight);
    obstacles.push({ x: canvas.width, y: yPosition });
}

// 更新遊戲邏輯
function update() {
    if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawTurtle();
        drawObstacles();

        // 移動障礙物
        obstacles.forEach(obstacle => {
            obstacle.x -= obstacleSpeed;
        });

        // 移除超出畫布的障礙物
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth > 0);

        // 碰撞檢測
        obstacles.forEach(obstacle => {
            if (
                turtleX + 20 > obstacle.x && 
                turtleX - 20 < obstacle.x + obstacleWidth &&
                turtleY + 20 > obstacle.y &&
                turtleY - 20 < obstacle.y + obstacleHeight
            ) {
                gameRunning = false; // 碰到障礙物，遊戲結束
                alert("遊戲結束！");
            }
        });

        requestAnimationFrame(update); // 遊戲持續更新
    }
}

// 控制烏龜的移動
window.addEventListener('keydown', (e) => {
    if (gameRunning) {
        switch (e.key) {
            case 'ArrowUp':
                if (turtleY - 20 > 0) turtleY -= turtleSpeed; // 確保不超出上邊界
                break;
            case 'ArrowDown':
                if (turtleY + 20 < canvas.height) turtleY += turtleSpeed; // 確保不超出下邊界
                break;
        }
    }
});

// 開始遊戲按鈕
document.getElementById('startButton').addEventListener('click', () => {
    turtleX = 100;
    turtleY = canvas.height / 2;
    obstacles = [];
    gameRunning = true;
    update();
    setInterval(generateObstacle, 2000); // 每2秒生成一個新障礙物
});
