import Phaser from 'phaser';

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'play' });
  }
  getNextX(prevX, prevWidth, width, sceneWidth, forceOut = false, prevMove = 0) {
    var min = prevX + prevWidth + width;
    var max = prevX + sceneWidth / 2 + width / 2;
    var v = Phaser.Math.Between(min, max);

    while (forceOut && v - prevX + prevWidth / 2 + width / 2 < sceneWidth) {
      v += prevMove * 2 * Math.random();
    }

    while (forceOut && prevMove && v - width / 2 - prevMove > sceneWidth) {
      v -= Math.random() * prevMove;
    }

    return v;
  }

  create() {
    this.sound.play('bgAudio');
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.bg = this.add.image(width / 2, height / 2, 'bg').setDisplaySize(width, height);
    this.isover = false;
    this.platforms = this.physics.add.staticGroup();
    this.xs = this.physics.add.staticGroup();

    this.wood = this.platforms.create(60, height - 491 / 2, 'wood');
    this.wood1 = this.platforms.create(
      this.getNextX(this.wood.x, this.wood.width, 120, width),
      height - 491 / 2,
      'wood'
    );

    this.wood2 = this.platforms.create(
      this.getNextX(
        this.wood1.x,
        this.wood1.width,
        120,
        width,
        true,
        this.wood1.x - this.wood1.displayWidth / 2
      ),
      height - 491 / 2,
      'wood'
    );
    this.updateAllWoodsX();

    var line = this.add.graphics();
    line.fillStyle('#000', 1);
    line.fillRect(0, 0, 1, 5);
    line.generateTexture('line', 1, 5);
    line.destroy();

    this.line = this.platforms
      .create(this.wood.x + this.wood.width / 2, height - this.wood.height, 'line')
      .setOrigin(0)
      .refreshBody();

    this.line.angle = -90;

    this.player = this.physics.add
      .sprite(this.wood.x, this.wood.y - this.wood.height / 2 - 80, 'player')
      .setScale(0.5);

    this.physics.add.collider(this.player, this.platforms);

    this.len = 0;
    this.input.enabled = true;
    this.timer = 0;

    this.input.on('pointerdown', () => {
      if (!this.isover) {
        this.timer = setInterval(() => {
          this.len += 60;
          this.line.displayWidth = this.len;
        }, 100);
      }
    });

    this.scoreText = this.add
      .text(width / 2, height / 2, '', {
        fontSize: '60px',
        color: 'blue',
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.input.on('pointerup', () => {
      if (this.isover) return;
      clearInterval(this.timer);

      const isShort = this.len + this.wood.width < this.wood1.x - this.wood1.width / 2;
      const isLong = this.len + this.wood.width > this.wood1.x + this.wood1.width / 2;

      var isWin = !isShort && !isLong;

      if (isWin) {
        this.player.body.allowGravity = false;
      } else {
        this.isover = true;
      }

      this.tweens.add({
        targets: [this.line],
        ease: 'Linear',
        duration: 200,
        angle: 0,
        onComplete: () => {
          this.tweens.add({
            targets: this.player,
            ease: 'Linear',
            duration: 500,
            x: isWin ? this.wood1.x : this.wood.displayWidth + this.len,
            repeat: 0,
            onComplete: () => {
              if (isWin) {
                this.len = 0;
                this.swithWood();
              } else {
                this.tweens.add({
                  targets: [this.line],
                  ease: 'Linear',
                  duration: 200,
                  angle: isShort ? 90 : 0,
                  repeat: 0,
                  onComplete: () => {
                    this.setGameOver();
                  },
                });
              }
            },
          });
        },
      });
    });
  }
  setGameOver() {
    this.player.body.allowGravity = true;
    this.player.setVelocityY(600);
    this.sound.play('fail');
    // this.player.setVelocityX(100);
    this.scoreText.setText('Gave over');
    this.scoreText.setVisible(true);
  }
  updateWoodX(w) {
    const { x, y } = w;
    if (!w.cl) {
      w.cl = this.xs.create(x - 20, y + 60, 'cl');
      w.cr = this.xs.create(x + 50, y - 50, 'cr');
    } else {
      w.cl.x = x - 20;
      w.cl.y = y + 60;
      w.cr.x = x + 50;
      w.cr.y = y - 50;
    }
  }
  updateAllWoodsX() {
    return;
    this.platforms.children.iterate((c) => this.updateWoodX(c));
  }
  swithWood() {
    const width = this.cameras.main.width;
    const move = this.wood1.x - this.wood1.displayWidth / 2;

    const xs = this.xs.getChildren();

    this.tweens.add({
      targets: [this.wood, this.wood1, this.wood2, this.player, this.line, ...xs],
      ease: 'Linear',
      duration: 1000,
      x: '-=' + move,
      onComplete: () => {
        var t = this.wood;
        this.wood = this.wood1;
        this.wood1 = this.wood2;
        this.platforms.children.iterate((child) => child.refreshBody());

        t.x = this.getNextX(this.wood1.x, this.wood1.width, 120, width, true, move);
        this.wood2 = t;
        this.line.displayWidth = 0;
        this.line.angle = -90;
        this.line.x = this.wood.x + this.wood.width / 2;

        if (this.wood1.x > width) {
          this.wood1.x = this.getNextX(this.wood.x, this.wood.width, 120, width);
        }
        this.updateAllWoodsX();
      },
    });
  }
  update() {}
}
