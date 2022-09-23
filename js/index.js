import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 550;
canvas.height = 600;

const bulletController = new BulletController(canvas);
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController
);

const enemies = [
  new Enemy(50, 20, "red", 10),
  new Enemy(150, 20, "green", 10),
  new Enemy(250, 20, "blue", 10),
  new Enemy(350, 20, "hotpink", 10),
  new Enemy(450, 20, "magenta", 10),
  new Enemy(50, 100, "gold", 10),
  new Enemy(150, 100, "lightblue", 10),
  new Enemy(250, 100, "aqua", 10),
  new Enemy(350, 100, "purple", 10),
  new Enemy(450, 100, "olive", 10),
];

function gameLoop() {
  setCommonStyle();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
  enemies.forEach((enemy) => {
    if (bulletController.collideWith(enemy)) {
      if (enemy.health <= 0) {
        const index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
      }
    } else {
      enemy.draw(ctx);
    }
  });
}

function setCommonStyle() {
  ctx.shadowColor = "red";
  ctx.shadowBlur = 50;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
