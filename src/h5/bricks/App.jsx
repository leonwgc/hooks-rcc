import React, { useEffect } from 'react';
import Phaser from 'phaser';
import sky from '../phaser/assets/sky.png';
import ground from '../phaser/assets/platform.png';
import star from '../phaser/assets/star.png';
import bird from './images/bird.png';

const App = () => {
  const width = 800;
  const height = 600;
  const platformHeight = 32;

  useEffect(() => {
    var config = {
      type: Phaser.AUTO,
      width,
      height,
      physics: {
        default: 'arcade',
        arcade: {
          //   gravity: { y: 300 },
          gravity: false,
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    var player;
    var gameOver = false;
    var stars;
    var stars1;
    var stars2;
    var sbird;
    var cursors;

    var game = new Phaser.Game(config);

    function preload() {
      //加载资源文件
      this.load.image('sky', sky);
      this.load.image('platform', ground);
      this.load.image('star', star);
      this.load.spritesheet('bird', bird, { frameWidth: 34, frameHeight: 24 });
    }
    function create() {
      // 一个简单的图片作为背景 A simple background for our game
      this.add.image(width / 2, height / 2, 'sky');

      // 创建玩家(角色) The player and its settings
      player = this.physics.add.sprite(width / 2, height - 8, 'platform').setScale(0.5);

      player.setCollideWorldBounds(true);
      player.setImmovable(true);

      this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
      });

      sbird = this.physics.add.sprite(width / 2, height - platformHeight - 30, 'bird');
      sbird.anims.play('fly');
      sbird.setBounce(1, 1);
      sbird.setCollideWorldBounds(true);
      sbird.setGravityY(300);
      sbird.setVelocityY(-100);

      /**
       * Disable collision with the bottom of the game world. This needs to be added
       * so the ball falls to the bottom, which means that the game is over
       */
      this.physics.world.checkCollision.down = false;

      // 由键盘控制方向 Input Events
      cursors = this.input.keyboard.createCursorKeys();

      //   产生12个星星每个之间空70像素 Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
      stars = this.physics.add.group({
        key: 'star',
        immovable: true,
        repeat: 11,
        setXY: { x: 12, y: 22, stepX: 70 },
      });

      stars1 = this.physics.add.group({
        key: 'star',
        immovable: true,
        repeat: 11,
        setXY: { x: 12, y: 52, stepX: 70 },
      });

      stars2 = this.physics.add.group({
        key: 'star',
        immovable: true,
        repeat: 11,
        setXY: { x: 12, y: 82, stepX: 70 },
      });

      this.physics.add.collider(sbird, stars, hitBrick, null, this);

      this.physics.add.collider(sbird, stars1, hitBrick, null, this);

      this.physics.add.collider(sbird, stars2, hitBrick, null, this);

      this.physics.add.collider(player, sbird, hitPlayer, null, this);
    }

    function hitPlayer(player, bird) {
      bird.setVelocityY(bird.body.velocity.y - 50);
    }

    function hitBrick(bird, star) {
      star.disableBody(true, true);

      if (player.body.velocity.x == 0) {
        randNum = Math.random();
        if (randNum >= 0.5) {
          player.body.setVelocityX(150);
        } else {
          player.body.setVelocityX(-150);
        }
      }
    }

    function update() {
      if (gameOver) {
        return;
      }

      if (cursors.left.isDown) {
        player.setVelocityX(-260);

        // player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(260);

        // player.anims.play('right', true);
      } else {
        player.setVelocityX(0);

        // player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }, []);

  return <div id="c1"></div>;
};

export default App;
