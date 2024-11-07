import './style.css'
import js from './assets/js.png'

console.log('working!')

const image = document.createElement('img');
image.src = js;
image.alt = 'js-logo';
image.width = 100;
image.height = 100;

document.querySelector('.logos').appendChild(image);