const game = new Phaser.Game(800, 600, Phaser.AUTO, '',{
  preload: preload,
  create: create,
  update, update
})

function preload () {
  game.load.image("background", "assets/background.png")
  game.load.image("block", "assets/block.png")
  game.load.image("coin", "assets/coin.png")
  game.load.image("floor", "assets/floor.png")
}

function create () {

  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.add.sprite(0,0, "background")

  platforms = game.add.group()
  platforms.enableBody = true

  let ground = platforms.create(0, game.world.height - 64, 'floor')
  ground.scale.setTo(2,2)
  ground.body.immovable = true

  let ledge = platforms.create(400, 450, 'floor')
  ground.body.immovable = true

  ledge = platforms.create(-75, 350, 'floor')
  ground.body.immovable = true

  let player = game.add.sprite(32, game.world.height - 150, "block")
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 800
  player.body.collideWorldBounds = true

  let coin = game.add.group()
  coin.enableBody = true

  for (var i=0; i < 12; i++) {
    let diamonds = coin.create(i * 70, 0, 'coin')
    player.body.bounce.y = 0.3 + Math.random() * 0.2
    player.body.gravity.y = 1000
  }

  scoreText = game.add.text(16, 16, '', {fontsize: '32 px', fill: '#000'})


}


function update () {}
