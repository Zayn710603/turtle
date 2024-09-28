const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let turtleX = canvas.width / 2;
let turtleY = canvas.height / 2;
const turtleSpeed = 5;

// 畫烏龜
function drawTurtle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(turtleX, turtleY, 20, 0, Math.PI * 2); // 畫一個圓形表示烏龜
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

// 更新畫面
function update() {
    drawTurtle();
    requestAnimationFrame(update); // 不斷更新畫面
}

// 開始遊戲按鈕
document.getElementById('startButton').addEventListener('click', () => {
    turtleX = canvas.width / 2;
    turtleY = canvas.height / 2;
    update(); // 開始遊戲更新
});

// 鍵盤控制烏龜移動
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            turtleY -= turtleSpeed;
            break;
        case 'ArrowDown':
            turtleY += turtleSpeed;
            break;
        case 'ArrowLeft':
            turtleX -= turtleSpeed;
            break;
        case 'ArrowRight':
            turtleX += turtleSpeed;
            break;
    }
});
