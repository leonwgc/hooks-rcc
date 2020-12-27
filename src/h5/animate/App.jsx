import React, { useEffect, useRef, useState, useCallback } from 'react';

import useAnimateCss from '~/hooks/useAnimateCss';
import './App.less';

// 注意给所有动画元素加个 visibility:hidden 样式

export default function App() {
  const { replay } = useAnimateCss('.rocket', 'bounceInLeft');

  useAnimateCss('.words p:not(:last-child)', 'fadeInLeft');

  useAnimateCss('.words p:last-child', 'fadeInDown');

  useAnimateCss('.rocket1', 'r1');
  useAnimateCss('.rocket2', 'r2');

  return (
    <div className="animate">
      <div className="rocket" onClick={replay}></div>

      <div className="words">
        <p className="red">感谢一起度过的2019</p>
        <p>2020年已经扬帆</p>
        <p>总有些感动，让我们无法忘记</p>
        <p>总有些成绩，让我们欢笑不已</p>
        <p>让我们写下来</p>
        <p className="red">与众安一起，共舞</p>
      </div>

      <div className="rocket1"></div>
      <div className="rocket2"></div>
    </div>
  );
}
