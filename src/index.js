// import _ from 'lodash';
// // import './style.css'
// // import code from './qrcode.png'
// // import data from './data.json'
// import printMe from './print.js'
// import { cube } from './math.js'

// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!')
// }
//   function component() {
//     var frag = document.createDocumentFragment();
//     var element = document.createElement('div');
// // Lodash, currently included via a script, is required for this line to work
// // Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack', '5 cube is equal to' + cube(5)], ' ');

//     element.classList.add('hello');

//     // var img = new Image()
//     // img.src = code

//     // element.appendChild(img)

//     frag.appendChild(element)

//     // for (var key in data) {
//     //   var el = document.createElement('p')
//     //   el.innerHTML = `${key}: ${data[key]}`
//     //   frag.appendChild(el)
//     // }

//     var btn = document.createElement('button')
//     btn.onclick = printMe
//     btn.innerHTML = 'click me'
//     frag.appendChild(btn)

//     return frag;

//   }

//   // document.body.appendChild(component());
// let element = component()
// document.body.appendChild(element)
//   if (module.hot) {
//     module.hot.accept('./print.js', () => {
//       console.log('Accepting the updated printMe module!')
//       // printMe()
//       document.body.removeChild(element)
//       element = component()
//       document.body.appendChild(element)
//     })
//   }



// function getComponent() {
//   return import('lodash').then(_ => {
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['hello', 'lodash'], '')
//     return element
//   }).catch(err => 'an error occurred while loading the component')
// }  

// getComponent().then(component => {
//   document.body.appendChild(component)
// })

// async function getComponent() {
//   const _ = await import(/* webpackChunkName: "lodash" */'lodash')  /*注释的内容必须存在，表示异步加载的块名*/
//   var element = document.createElement('div');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return element;
// }
//    getComponent().then(component => {
//      document.body.appendChild(component);
//    })
  

// import _ from 'lodash'

// function component () {
//   const element = document.createElement('div')
//   const button = document.createElement('button')
//   const br = document.createElement('br')
//   button.innerHTML = 'click'
//   element.appendChild(button)
//   element.appendChild(br)

//   button.onclick = e => import(/* webpackChunkName: 'print' */ './print').then(module => {
//     const print = module.default
//     print()
//   })
//   return element
// }

// document.body.appendChild(component())

// import _ from 'lodash'
// import numRef from './ref.json'

// export function numToWord(num) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.num === num? ref.word: accum
//   }, '')
// }

// export function wordToNum(word) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.word === word && word.toLowerCase()? ref.num: accum
//   }, -1)
// }

// import {file, parse} from './globals.js'
// import 'babel-polyfill';
function component () {
  let element = document.createElement('div')
  // element.innerHTML = _.join(['HELLO', 'WORLD', file, ''])
  element.innerHTML = 'HELLO WORLD'
  this.alert('Hmmm, this probably isn\'t a great idea...')

  return element
}
document.body.appendChild(component())