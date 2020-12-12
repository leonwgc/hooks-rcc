import { useEffect } from 'react';
import 'animate.css';

// refer animate 4.xx
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const nodeList = [...document.querySelectorAll(element)];

    for (let node of nodeList) {
      // node.style.visibility = 'visible';
      node.classList.add(`${prefix}animated`, animationName);

      function handleAnimationEnd() {
        node.classList.remove(`${prefix}animated`, animationName);
        resolve();
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true });
    }
  });

const useAnimateCss = (selector, animation) => {
  useEffect(() => {
    animateCSS(selector, animation);
  }, []);

  return {
    replay: () => {
      animateCSS(selector, animation);
    },
  };
};

export default useAnimateCss;
