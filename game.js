const game = new Phaser.Game(800, 600, Phaser.AUTO, '',{
  preload: preload,
  create: create,
  update, update
});

let platforms;
let ground;
let ledge;
let player;
let coin;
let score = 0;
let scoreText;
let keyControl = true;
let spaceKey;

function preload () {
  game.load.image("background", "./assets/background.png");
  game.load.image("block", "./assets/block.png");
  game.load.image("coin", "./assets/coin.png");
  game.load.image("floor", "./assets/floor.png");
}

function create () {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  bg = game.add.sprite(0,0, "background");
  bg.width = game.width;
  bg.height = game.height;

  platforms = game.add.group();
  platforms.enableBody = true;

  ground = platforms.create(0, game.world.height - 24, 'floor');
  ground.scale.setTo(2,2);
  ground.body.immovable = true;

  ledge = platforms.create(400, 450, 'floor');
  ledge.body.immovable = true;
  ledge.width = 40;

  ledge = platforms.create(0, 350, 'floor');
  ledge.body.immovable = true;
  ledge.width = 40;

  player = game.add.sprite(32, game.world.height - 550, "block");
  game.physics.arcade.enable(player);
  player.width = 25;
  player.height = 50;
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 800;
  player.body.collideWorldBounds = true;

  coin = game.add.group();
  coin.enableBody = true;

  for (var i=0; i < 12; i++) {
    let coins = coin.create(i * 70, 0, 'coin');
    coins.width = 10;
    coins.height= 10;
    coins.body.bounce.y = 0.3 + Math.random() * 0.2;
    coins.body.gravity.y = 1000;
    coins.body.collideWorldBounds = true;
  }

  scoreText = game.add.text(16, 16, '', {font: '32pt Arial', fill: '#000'});
  scoreText.text = "Score: " + score;

  instrText = game.add.text(16, 55, '', {font: '16pt Arial', fill: '#000'});
  instrText.text = "Press SPACE to restart.";
  cursors = game.input.keyboard.createCursorKeys();
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function update () {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(coin, platforms);
  game.physics.arcade.overlap(player, coin, collectCoins, null, this);
  player.body.velocity.x = 0;

  if (keyControl) {
    if (cursors.left.isDown) {
      player.body.velocity.x -= 200;
    } else if (cursors.right.isDown) {
      player.body.velocity.x += 200;
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y -= 500;
    }

    if (spaceKey.isDown) {
      score = 0;
      create();
    }
  }

  if (score == 12) {
    scoreText.position.x = 300;
    scoreText.position.y = 200;
    scoreText.text = "Yey u win :DDDD";
    scoreText.cssFont = "55pt Arial";
    keyControl = false;
  }
}

function collectCoins(player, coin) {
  coin.kill();
  score += 1;
  scoreText.text = "Score: " + score;
}
