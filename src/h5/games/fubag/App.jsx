import React, { useEffect } from 'react';
import Phaser from 'phaser';
import startBg from './assets/MainMenu.jpg';
import coverBg from './assets/cover.png';
import gameBg from './assets/gameBg.jpg';
import fudai from './assets/fudai.png';
import player from './assets/player.png';

const App = () => {
  const width = 750;
  const height = 1206;

  useEffect(() => {
    var config = {
      type: Phaser.AUTO,
      width,
      height,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [
        {
          key: 'start',
          active: true,
          preload: function () {
            if (game.device.os.desktop) {
              this.scale.scaleMode = Phaser.Scale.FIT;
            } else {
              this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
            }

            this.load.image('startBg', startBg);
            this.load.image('cover', coverBg);
            this.load.image('gameBg', gameBg);
            this.load.image('player', player);
            this.load.image('fudai', fudai);
          },
          create: function () {
            this.add.image(width / 2, height / 2, 'startBg');
            var btn = this.add
              .text(width / 2 - 62, height - 280, '开始游戏', {
                fontSize: '62px',
                fill: 'red',
              })
              .setInteractive();

            btn.on('pointerdown', () => {
              this.scene.start('tip');
            });
          },
        },
        {
          key: 'tip',
          active: false,
          visible: false,
          preload: function () {},
          create: function () {
            this.bg = this.add.image(width / 2, height / 2, 'gameBg');
            this.player = this.physics.add.sprite(width / 2, height - 100, 'player').setScale(0.3);
            this.cover = this.add.sprite(width / 2, height / 2, 'cover').setInteractive();
            this.cover.on('pointerdown', () => {
              this.cover.visible = false;
            });

            this.score = 0;
            this.scoreText = this.add.text(16, 16, 'score: 0', {
              fontSize: '32px',
              fill: '#000',
            });

            this.player.setInteractive();
            this.input.setDraggable(this.player);
            this.player.setCollideWorldBounds(true);

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
              gameObject.x = dragX;
              gameObject.y = dragY;
            });

            // 产生12个星星每个之间空70像素 Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
            var fudai = (this.fudai = this.physics.add.group({
              key: 'fudai',
              repeat: 11,
              setXY: { x: 12, y: 0, stepX: 70 },
            }));

            fudai.children.iterate(function (child) {
              // 对于每个星星产生不同的反弹系数 Give each star a slightly different bounce
              //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              child.body.gravity.y = Phaser.Math.Between(100, 500);
            });

            this.physics.add.overlap(
              this.player,
              this.fudai,
              (player, item) => {
                item.disableBody(true, true);
                this.score += 10;
                this.scoreText.setText('score:' + this.score);
                if (this.fudai.countActive(true) === 0) {
                  this.fudai.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                  });
                }
              },
              null,
              this
            );
          },
          update: function () {
            var that = this;
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
          },
        },
      ],
    };

    var game = new Phaser.Game(config);
  }, []);

  return <div id="c1"></div>;
};

export default App;
