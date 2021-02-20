import Phaser from 'phaser';

export default class ScenePlay extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }

  start() {
    this.cover.visible = false;
    this.scoreText.setVisible(true);
    this.moveFudai();
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.bg = this.add.image(width / 2, height / 2, 'gameBg');

    this.player = this.physics.add
      .sprite(width / 2, height - 100, 'player')
      .setDisplaySize(170, 190);
    this.cover = this.add.sprite(width / 2, height / 2, 'cover').setInteractive();
    // click to start
    this.cover.on('pointerdown', () => {
      this.start();
    });

    // press key to start
    this.input.keyboard.on('keydown', () => {
      this.start();
    });

    this.score = 0;
    this.scoreText = this.add
      .text(width / 2, height / 2, 'score: 0', {
        fontSize: '32px',
        fill: 'red',
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.player.setInteractive();
    this.input.setDraggable(this.player);
    this.player.setCollideWorldBounds(true);

    //controlled with drag
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
    });

    // 由键盘控制方向 Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fudai = this.physics.add.group({
      key: 'fudai',
      repeat: 7,
      setXY: { x: 12, y: 0, stepX: 100 },
    });

    this.particles = this.add.particles('red');

    this.fudai.children.iterate((child) => {
      var emitter = this.particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0.1 },
        blendMode: 'ADD',
      });

      emitter.startFollow(child.body, 20);
    });

    this.physics.add.overlap(this.player, this.fudai, (player, fudai) => {
      fudai.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('score:' + this.score);
      if (this.fudai.countActive(true) === 0) {
        this.fudai.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }
    });
  }
  moveFudai() {
    this.fudai.children.iterate((child) => {
      child.body.gravity.y = Phaser.Math.Between(100, 500);
    });
  }

  update() {
    var that = this;
    var cursors = this.cursors;
    var player = this.player;
    this.fudai.children.iterate(function (child) {
      if (child.y > that.sys.canvas.height) {
        child.disableBody(true, true);

        if (that.fudai.countActive(true) === 0) {
          that.fudai.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
          });
        }
      }
    });

    // player move by keyboard
    if (cursors.left.isDown) {
      player.setVelocityX(-460);
    } else if (cursors.right.isDown) {
      player.setVelocityX(460);
    } else {
      player.setVelocityX(0);
    }
  }
}
