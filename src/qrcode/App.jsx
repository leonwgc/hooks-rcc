import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import 'zarm/dist/zarm.min.css';
import './App.less';
import './lib';

// Set qrcode.callback to function "func(data)", where data will get the decoded information.
// Decode image with: qrcode.decode(url or DataURL). Decode from canvas with "qr-canvas" ID: qrcode.decode()

const App = () => {
  useEffect(() => {
    var video = document.querySelector('video');

    var canvas = document.getElementById('qr-canvas');
    var width = document.body.clientWidth - 30;
    var height = width;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    //设置二维码回调函数
    qrcode.callback = read;

    var getImgTiming = null;

    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先，如果有getUserMedia的话，就获得它
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { min: 375 },
          height: { min: 375 },
        },
      })
      .then(function (stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
          drawVideoAtCanvas();
        };
      })
      .catch(function (err) {
        alert(err.name + ': ' + err.message);
      });

    // 将视频帧绘制到Canvas对象上,Canvas每60ms切换帧，形成肉眼视频效果
    function drawVideoAtCanvas() {
      window.setInterval(function () {
        ctx.drawImage(video, 0, 0);
      }, 60);
      // 定时进行图片转换成二维码
      getImgTiming = window.setInterval(function () {
        getQrCode();
      }, 1000);
    }

    // 转化图片,并解析
    function getQrCode() {
      var dataURL = canvas.toDataURL('image/png');
      var re = getBlobBydataURI(dataURL, 'image/png');
      qrcode.decode(getObjectURL(re));
    }

    function read(res) {
      if (res == 'error decoding QR Code') {
      } else {
        clearInterval(getImgTiming);
        alert(res);
        return false;
      }
    }

    function getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }

    function getBlobBydataURI(dataURI, type) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    }
  }, []);

  const onClick = () => {
    qrcode.decode_url();
  };

  return (
    <div className="qrcode-page">
      <canvas id="qr-canvas" onClick={onClick}></canvas>
      <div id="outdiv" style={{ display: 'none' }}>
        <video id="vedio"></video>
      </div>
    </div>
  );
};

export default hot(App);
