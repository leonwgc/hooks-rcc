import Phaser from 'phaser';
import startBg from './assets/MainMenu.jpg';
import coverBg from './assets/cover.png';
import gameBg from './assets/gameBg.jpg';
import fudai from './assets/fudai.png';
import player from './assets/player.png';
import red from './assets/red.png';

export default class ScenePlay extends Phaser.Scene {
  constructor() {
    super({ key: 'start' });
  }
  init() {
    if (this.game.device.os.desktop) {
      this.scale.scaleMode = Phaser.Scale.FIT;
    } else {
      this.scale.scaleMode = Phaser.Scale.CENTER_BOTH;
    }
  }

  preload() {
    this.load.image('startBg', startBg);
    this.load.image('cover', coverBg);
    this.load.image('gameBg', gameBg);
    this.load.image('player', player);
    this.load.image('fudai', fudai);
    this.load.image('red', red);
  }
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2, 'startBg');
    var btn = this.add
      .text(width / 2, height - 280, '开始游戏', {
        fontSize: '62px',
        fill: 'red',
      })
      .setOrigin(0.5)
      .setInteractive();

    btn.on('pointerdown', () => {
      this.scene.start('play');
    });
  }
}
