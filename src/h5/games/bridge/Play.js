import Phaser from 'phaser';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.bg = this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);

    this.platforms = this.physics.add.staticGroup();

    this.wood = this.platforms
      .create(0, height - 200, 'wood')
      .setDisplaySize(Phaser.Math.Between(50, 100), 200)
      .setOrigin(0, 0);

    this.wood1 = this.platforms
      .create(
        Phaser.Math.Between(this.wood.x + this.wood.width + 20, width - 100),
        height - 200,
        'wood'
      )
      .setDisplaySize(Phaser.Math.Between(50, 100), 200)
      .setOrigin(0, 0);

    this.line = this.add
      .rectangle(
        this.wood.x + this.wood.displayWidth,
        height - this.wood.displayHeight,
        0,
        5,
        'red'
      )
      .setOrigin(0);

    // this.line.body.allowGravity = false;

    // this.line.setImmovable(true);
    // this.line.body.allowGravity = false;
    // this.line.setVelocityX(50);

    var player = (this.player = this.physics.add
      .sprite(this.wood.displayWidth / 2, height - 200 - 33, 'player')
      .setDisplaySize(71 / 2, 66 / 2)).setOrigin(0);

    player.setDepth(10000);

    this.len = 0;

    this.platforms = this.physics.add.staticGroup();

    this.physics.add.collider(player, this.wood);
    this.physics.add.collider(player, this.wood1);
    this.physics.add.collider(player, this.line);

    this.tween = this.tweens.add({
      targets: this.player,
      x: this.player.x,
      paused: true,
      alpha: 1,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 800,
      repeat: 0, // -1: infinity
    });
    this.timer = 0;
    // press key to start
    this.input.on('pointerdown', () => {
      this.timer = setInterval(() => {
        this.len += 10;
        this.line.width = this.len;
        console.log(this.len);
      }, 100);
    });

    this.input.on('pointerup', () => {
      clearInterval(this.timer);
      this.player.setVelocityX(this.len + this.line.x);
      this.player.setGravityY(100);

      // this.tween.resume();
      // this.tween.updateTo('x', this.len + this.line.x, true);
    });

    this.input.enabled = true;

    // player.setCollideWorldBounds(true);

    this.score = 0;
    this.scoreText = this.add
      .text(width / 2, height / 2, 'score: 0', {
        fontSize: '18px',
      })
      .setOrigin(0.5)
      .setVisible(false);
  }
  update() {
    if (this.player.body.onFloor()) {
      this.player.disableBody(true, true); // game over
    }
  }
}
