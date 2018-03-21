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

async function getComponent() {
  const _ = await import(/* webpackChunkName: "lodash" */'lodash')
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
   getComponent().then(component => {
     document.body.appendChild(component);
   })
  