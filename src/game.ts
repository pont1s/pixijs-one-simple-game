import { Application, Container, DisplayObject, ICanvas, Text } from 'pixi.js';
import { changeSize, HEIGHT, WIDTH } from '@/config';
import { Point } from '@/types';

import { Player } from '@/sprites/Player';
import { createEnemy, Enemy } from '@/sprites/Enemy';
import { Coin } from '@/sprites/Coin';

import { checkCollision } from '@/utils/collision';

type GameState = {
  mousePosition: Point;
  enemies: Enemy[],
  enemiesRef?: Container<DisplayObject>,
  player?: Player,
  coin?: Coin,
  score: number;
  app?: Application<ICanvas>;
};

const gameState: GameState = {
  mousePosition: { x: 0, y: 0 },
  enemies: [],
  score: 0,
};

const enemiesTick = () => {
  gameState.enemies.forEach((enemy) => {
    enemy.tick();
  });
};

const initEnemies = () => {
  const enemies = new Container();
  enemies.name = 'Enemies';
  return enemies;
};

const textScoreCreate = () => {
  const text = new Text(`Score: ${gameState.score}`);
  text.name = 'Score';
  text.x = 10;
  text.y = 10;
  text.style = {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#e07b14',
  };

  return text;
};

const textScoreRender = () => {
  if (gameState.app) {
    const rootContainer = gameState.app.stage;
    const textScore = rootContainer.getChildByName('Score');
    if (textScore) {
      textScore.destroy({ children: true });
    }

    rootContainer.addChild(textScoreCreate());
  }
};

const destroyEnemies = () => {
  gameState.enemiesRef?.children.forEach((enemy) => {
    enemy.destroy({ children: true });
  });
  gameState.enemiesRef?.removeChildren(0);
  gameState.enemies = [];
};

const createScene = () => {
  const app = new Application({
    background: '#232323',
    antialias: true,
    width: WIDTH,
    height: HEIGHT,
  });
  gameState.app = app;
  document.body.appendChild(app.view as unknown as Node);
  const rootContainer = app.stage;
  rootContainer.eventMode = 'dynamic';
  rootContainer.hitArea= app.screen;

  const player = new Player('#4979e0', 10, {x: 0, y: 0});
  gameState.player = player;
  rootContainer.addChild(player.getCircle());

  const coin = new Coin('#e5d016', 10, {x: 0, y: 0});
  coin.random();
  gameState.coin = coin;
  rootContainer.addChild(coin.getCircle());

  const enemies = initEnemies();
  gameState.enemiesRef = enemies;
  rootContainer.addChild(enemies);

  textScoreRender();

  console.log('Scene created');
};

const reset = () => {
  destroyEnemies();

  gameState.score = 0;
  textScoreRender();

  gameState.coin?.random();
  gameState.player?.reset();
};

const checkAllCollision = () => {
  if (gameState.app) {
    const rootContainer = gameState.app.stage;
    const player = rootContainer.getChildByName('Player');
    const coin = rootContainer.getChildByName('Coin');
    const enemies = rootContainer.getChildByName<Container>('Enemies');

    if (coin && player) {
      if (checkCollision(player, coin)) {
        gameState.coin?.random();

        const enemy = createEnemy();
        gameState.enemies.push(enemy);
        gameState.enemiesRef?.addChild(enemy.getCircle());

        gameState.score += 1;
        textScoreRender();
      }
    }

    if (enemies && player) {
      enemies.children.forEach((enemy) => {
        if (checkCollision(enemy, player)) {
         reset();
        }
      });
    }
  }
};

const initInteraction = () => {
  if (gameState.player) {
    gameState.mousePosition.x = gameState.player.getPosition().x;
    gameState.mousePosition.y = gameState.player.getPosition().y;
  }

  gameState.app?.stage?.addEventListener('pointermove', (e) => {
    gameState.mousePosition.x = e.global.x;
    gameState.mousePosition.y = e.global.y;
  });

  gameState.app?.ticker?.add(() => {
    gameState.player?.tick(gameState.mousePosition);
    gameState.coin?.tick();
    enemiesTick();
    checkAllCollision();
  });

  console.log('Interaction init');
};

window.onresize = () => {
  changeSize(window.innerWidth, window.innerHeight);
  gameState.app?.renderer.resize(WIDTH, HEIGHT);
  reset();
}

export const initGame = () => {
  createScene();
  initInteraction();
  console.log('Game init');
};
