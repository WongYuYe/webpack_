import './assets/index.less';
import './assets/index.css';
import './assets/iconfont.css';

// import { add } from './add';

/*
  按需加载
  import动态导入：将某个文件单独打包
  懒加载：当文件需要使用时加载
  预加载prefetch：使用之前提前加载js
  正常加载是并行下载，预加载是等其他资源加载完毕，再偷偷加载资源
*/
// import(/* webpackChunkName: 'add', webpackPrefetch: true*/'./add')
//   .then((res) => {
//     // 文件加载成功
//     // add(1,2)
//     console.log(res);

//   })
//   .catch(err => console.log(err))

// console.log(add(4, 2));

// const add = (x, y) => x + y;
// add(1, 2);

// console.log('hello s');

// if (module.hot) {
//   module.hot.accept('./add', () => {
//     console.log(add(1, 2));
//   });
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worder.js')
      .then(() => {
        console.log('sw注册成功');
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
