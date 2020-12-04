import { useEffect, useRef } from 'react';
import './sig';
//手写签名

function _download(dataURL, filename) {
  var blob = _dataURLToBlob(dataURL);
  var url = window.URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.style = 'display: none';
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}

function _dataURLToBlob(dataURL) {
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

export default function useSignature(
  cavansRef,
  options = {
    backgroundColor: 'rgb(255, 255, 255,0)',
    penColor: 'black',
    useLandscape: true,
  }
) {
  const _pad = useRef();
  useEffect(() => {
    var canvas = cavansRef.current;
    var signaturePad = (_pad.current = new SignaturePad(canvas, options));

    function resizeCanvas() {
      const { useLandscape } = options;
      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      if (useLandscape) {
        var ctx = canvas.getContext('2d');
        ctx.rotate(1.5 * Math.PI);
        ctx.translate(-canvas.height, 0);
      }

      signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    setTimeout(() => {
      resizeCanvas();
    }, 100);

    return () => window.removeEventListener('resize', resizeCanvas, false);
  }, [cavansRef, options]);

  const download = (fileName) => {
    let type = '';
    if (/\.jpg$/i.test(fileName)) {
      type = 'image/jpeg';
    } else if (/\.svg$/.test(fileName)) {
      type = 'image/svg+xml';
    }
    // default to png
    var dataURL = _pad.current.toDataURL(type);
    _download(dataURL, fileName);
  };

  const undo = () => {
    if (options.useLandscape) {
      console.log(`not supported`);
      return;
    }
    var data = _pad.current.toData();

    if (data) {
      data.pop(); // remove the last dot or line
      _pad.current.fromData(data);
    }
  };

  const setPenColor = (color) => {
    _pad.current.penColor = color;
  };

  const clear = () => {
    _pad.current.clear();

    if (options.useLandscape) {
      var canvas = cavansRef.current;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.height, canvas.width);
    }
  };

  return { download, pad: _pad.current, undo, setPenColor, clear };
}
