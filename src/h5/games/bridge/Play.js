import Phaser from 'phaser';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.bg = this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);
    var player = (this.player = this.physics.add.sprite(120 / 2, height - 490 - 132 / 2, 'player'))
      .setScale(0.5)
      .setOrigin(0);
    player.body.allowGravity = false;
    this.platforms = this.physics.add.staticGroup();
    this.physics.add.collider(this.player, this.platforms);
    this.wood = this.platforms.create(0, height - 491, 'wood').setOrigin(0, 0);

    this.wood1 = this.platforms
      .create(Phaser.Math.Between(120 * 2, width - 120), height - 491, 'wood')
      .setOrigin(0, 0);

    var line = this.add.graphics();
    line.fillStyle('#000', 1);
    line.fillRect(0, 0, 1, 5);
    line.generateTexture('line', 1, 5);
    line.destroy();

    this.line = this.platforms
      .create(this.wood.x + this.wood.displayWidth, height - this.wood.displayHeight, 'line')
      .setOrigin(0);

    player.setDepth(10000).setBounce(0.1).setCollideWorldBounds(true);

    this.len = 0;

    this.input.enabled = true;
    this.timer = 0;
    // press key to start
    this.input.on('pointerdown', () => {
      this.timer = setInterval(() => {
        this.len += 30;
        this.line.displayWidth = this.len;
        console.log(this.len);
      }, 100);
    });

    this.input.on('pointerup', () => {
      clearInterval(this.timer);
      this.player.setX(this.player.x + this.len);
    });

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
