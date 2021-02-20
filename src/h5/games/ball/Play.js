import Phaser from 'phaser';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }

  start() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.tipText.setVisible(false);
      this.scoreText.setVisible(true);
    }
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.bg = this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);

    this.isPlaying = false;
    // press key to start
    this.input.keyboard.on('keydown', () => {
      if (!this.isPlaying) {
        this.start();
      }
    });

    this.input.enabled = true;
    var ball = this.physics.add.sprite(width / 2, height - 17, 'ball').setDisplaySize(34, 34);

    var ball1 = (this.ball1 = this.physics.add
      .sprite(width / 2, height - 17, 'ball')
      .setDisplaySize(34, 34));
    ball1.setBounce(1);
    ball1.setCollideWorldBounds(true);

    this.input.on('pointerup', (pointer) => {
      if (this.isPlaying) {
        var angle = Phaser.Math.Angle.BetweenPoints(ball, pointer);
        ball1.enableBody(true, ball.x, ball.y, true, true);
        this.physics.velocityFromRotation(angle, 600, ball1.body.velocity);
      }
    });

    this.score = 0;
    this.scoreText = this.add
      .text(width / 2, height / 2, 'score: 0', {
        fontSize: '18px',
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.tipText = this.add
      .text(width / 2, height / 2, 'press any key to start', {
        fontSize: '18px',
      })
      .setOrigin(0.5);

    this.apple = this.physics.add.group({
      key: 'apple',
      repeat: 5,
      setXY: { x: 25, y: 25, stepX: 60 },
      immovable: true,
    });

    this.apple1 = this.physics.add.group({
      key: 'apple',
      repeat: 5,
      setXY: { x: 25, y: 95, stepX: 60 },
    });

    this.apple2 = this.physics.add.group({
      key: 'apple',
      repeat: 5,
      setXY: { x: 25, y: 165, stepX: 60 },
    });

    const overlapFn = (ball, apple) => {
      apple.disableBody(true, true);
      ball.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('score:' + this.score);
    };

    this.physics.add.overlap(ball1, this.apple, overlapFn);
    this.physics.add.overlap(ball1, this.apple1, overlapFn);
    this.physics.add.overlap(ball1, this.apple2, overlapFn);
  }

  update() {
    if (this.ball1.body.onCeiling()) {
      this.ball1.disableBody(true, true);
    }
  }
}
