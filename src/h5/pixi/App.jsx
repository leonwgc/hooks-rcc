import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import mount from './mount.jpg';

//g 生成年终账单

const App = () => {
  console.log(mount);
  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(app.view);

    const loader = app.loader;

    // load the texture we need
    app.loader.add('mount', mount).load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const sprite = new PIXI.Sprite(resources.mount.texture);

      // Setup the position of the bunny
      sprite.x = app.renderer.width / 2;
      sprite.y = app.renderer.height / 2;

      // Rotate around the center
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.stage.addChild(sprite);

      // Listen for frame updates
      app.ticker.add(() => {
        // each frame we spin the bunny around a bit
        sprite.rotation += 0.01;
      });
    });

    var textSample = new PIXI.Text('this is text', {
      fontSize: '16px',
      fill: 'white',
      align: 'left',
    });
    textSample.x = app.renderer.width / 3;
    textSample.y = 50;

    app.stage.addChild(textSample);

    loader.onProgress.add(() => {
      console.log('onProgress');
    }); // called once per loaded/errored file
    loader.onError.add(() => {
      console.log('onError');
    }); // called once per errored file
    loader.onLoad.add(() => {
      console.log('onLoad');
    }); // called once per loaded file
    loader.onComplete.add(() => {
      console.log('onComplete');
    }); // called once when the queued resources all load.
  }, []);

  return <div id="c1"></div>;
};

export default App;
