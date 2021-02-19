import React, { useEffect } from 'react';
import Phaser from 'phaser';
import SceneStart from './SceneStart';
import ScenePlay from './ScenePlay';

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
      scene: [SceneStart, ScenePlay],
    };

    var game = new Phaser.Game(config);
  }, []);

  return <div id="c1"></div>;
};

export default App;
