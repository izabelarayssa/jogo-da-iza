// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // tamanho da célula
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: box * 5, y: box * 5 }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};
let score = 0;

// Detectar a direção da cobra
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Reiniciar o jogo
document.getElementById('restartBtn').addEventListener('click', () => {
    snake = [{ x: box * 5, y: box * 5 }];
    direction = 'RIGHT';
    score = 0;
    placeFood();
});

// Colocar comida em uma posição aleatória
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenhar a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Mover a cabeça da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    // Cobra come a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    // Fim do jogo se a cobra colide com ela mesma ou com as bordas
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        alert('Fim de jogo! Sua pontuação foi: ' + score);
        snake = [{ x: box * 5, y: box * 5 }];
        direction = 'RIGHT';
        score = 0;
        placeFood();
    }

    snake.unshift(newHead);
}

// Detectar colisão com o próprio corpo
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Atualizar o jogo a cada intervalo
setInterval(draw, 300);