import './assets/index.less';
import './assets/index.css';
import './assets/iconfont.css';

import add from './add';

console.log(add(1, 2));

// const add = (x, y) => x + y;
// add(1, 2);

console.log('hello s');

if (module.hot) {
  module.hot.accept('./add', () => {
    console.log(add(1, 2));
  });
}
