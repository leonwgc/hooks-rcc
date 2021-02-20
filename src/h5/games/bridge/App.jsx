import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Start from './Start';
import Play from './Play';

const App = () => {
  useEffect(() => {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [Start, Play],
    };

    var game = new Phaser.Game(config);
  }, []);

  return <div id="c1"></div>;
};

export default App;
