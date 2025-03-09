const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

class MainBall {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Ball {
    constructor(parentBall, radius, color, distance, speed) {
        this.parentBall = parentBall;
        this.radius = radius;
        this.color = color;
        this.distance = distance;
        this.speed = speed;
    }

    update(angle) {
        this.x = this.parentBall.x + Math.sin(angle * this.speed) * this.distance;
        this.y = this.parentBall.y + Math.cos(angle * this.speed) * this.distance;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
}

let angle = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mainBall = new MainBall(canvas.width / 2, canvas.height / 2, 100, "rgb(255, 255, 255)");
const ball1 = new Ball(mainBall, 25, "rgb(255, 0, 0)", 200, 1);
const ball2 = new Ball(ball1, 10, "rgb(0, 255, 0)", 55, 2);

function animate() {
    angle -= 0.01;

    if (angle > Math.PI * 2) {
        angle -= Math.PI * 2;
    } else {
        angle += Math.PI * 2;
    }

    ball1.update(angle);
    ball2.update(angle);

    context.clearRect(0, 0, canvas.width, canvas.height);

    mainBall.draw(context);
    ball1.draw(context);
    ball2.draw(context);

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    mainBall.x = canvas.width / 2;
    mainBall.y = canvas.height / 2;
})