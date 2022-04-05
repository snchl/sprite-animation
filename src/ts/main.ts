import '../style/style.scss';

// Canvas
const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement | null;
const canvas_width: number = 200;
const canvas_height: number = 200;
// Sprite
const sprite: HTMLImageElement = document.createElement('img');
let flip: boolean = false;
// Stand
const sprite_stand_width: number = 25;
const sprite_stand_height: number = 40;
const sprite_stand_space: number = 95;
const sprite_stand_x: number = canvas_width / 2 - sprite_stand_width / 2;
const sprite_stand_y: number = canvas_height - sprite_stand_height;
// Run
const sprite_run_width: number = 32;
const sprite_run_height: number = 39;
const sprite_run_space: number = 88;
const sprite_run_x: number = canvas_width / 2 - sprite_run_width / 2;
const sprite_run_y: number = canvas_height - sprite_run_height;
let sprite_stand_count: number = 0;
let sprite_stand_position: number = 0;
let sprite_run_count: number = 0;
let sprite_run_position: number = 0;
// Keys
const actions: { right: boolean, left: boolean } = {
  right: false,
  left: false
};

/*
* Draw background
*/
function drawBackground(context: CanvasRenderingContext2D) {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas_width, canvas_height);
}

/*
* Draw sprite
*/
function drawKnight(context: CanvasRenderingContext2D, flip: boolean) {
  sprite.src = './src/assets/_Idle.png';
  sprite.onload = () => {
    sprite_stand_count = Math.trunc((sprite.width - sprite_stand_width) / (sprite_stand_width + sprite_stand_space)) + 1;
  };
  context.save();
  if (flip) {
    context.translate(sprite_stand_x + sprite_stand_width, sprite_stand_y);
    context.scale(-1, 1);
  }
  context.drawImage(
    sprite,
    (sprite_stand_width + sprite_stand_space) * sprite_stand_position,
    0,
    sprite_stand_width,
    sprite_stand_height,
    flip ? 0 : sprite_stand_x,
    flip ? 0 : sprite_stand_y,
    sprite_stand_width,
    sprite_stand_height
  );
  context.restore();
}
function drawRunKnight(context: CanvasRenderingContext2D, flip: boolean) {
  sprite.src = './src/assets/_Run.png';
  sprite.onload = () => {
    sprite_run_count = Math.trunc((sprite.width - sprite_run_width) / (sprite_run_width + sprite_run_space)) + 1;
  };
  context.save();
  if (flip) {
    context.translate(sprite_run_x + sprite_run_width, sprite_run_y);
    context.scale(-1, 1);
  }
  context.drawImage(
    sprite,
    (sprite_run_width + sprite_run_space) * sprite_run_position,
    0,
    sprite_run_width,
    sprite_run_height,
    flip ? 0 : sprite_run_x,
    flip ? 0 : sprite_run_y,
    sprite_run_width,
    sprite_run_height
  );
  context.restore();
}

/*
* Stand knight
*/
function stand() {
  if (sprite_stand_position === sprite_stand_count - 1) {
    sprite_stand_position = 0;
  } else {
    sprite_stand_position += 1;
  }
}

/*
* Move knight
*/
function run() {
  if (sprite_run_position === sprite_run_count - 1) {
    sprite_run_position = 0;
  } else {
    sprite_run_position += 1;
  }
}

/*
* Keyboard event
*/
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    actions.right = true;
  }
  if (e.key === 'ArrowLeft') {
    actions.left = true;
  }
}

function onKeyUp(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    actions.right = false;
  }
  if (e.key === 'ArrowLeft') {
    actions.left = false;
  }
}

/*
* Game loop
*/
function game(context: CanvasRenderingContext2D) {
  if (actions.right) {
    sprite_stand_position = 0;
    flip = false;
    run();
    context.save();
    // context.scale(1, 0);
  } else if (actions.left) {
    sprite_stand_position = 0;
    flip = true;
    run();
    context.save();
    // context.scale(-1, 0);
  } else {
    sprite_run_position = 0;
    stand();
  }

  drawBackground(context);
  if (actions.right || actions.left) {
    drawRunKnight(context, flip);
  } else {
    drawKnight(context, flip);
  }
  context.restore();
}

if (canvas !== null) {
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  if (context !== null) {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    setInterval(() => {
      game(context);
    }, 50);
  }
}
