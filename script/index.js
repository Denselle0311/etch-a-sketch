const colorPicker = document.querySelector('#color-picker');
const colorMode = document.querySelector('#color-mode');
const randomMode = document.querySelector('#rnd-color');
const gridLines = document.querySelector('#grid-lines');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll('button');
const gridSlider = document.querySelector('#grid-size')
const gridContainer = document.querySelector('.container');
const gridDisplaySize = document.querySelector('.size-value');

const DEFAULT_COLOR = 'black';
const ERASER_COLOR = 'white';

const COLOR_MODE = 'color-mode';
const RANDOM_MODE = 'random-mode';
const ERASER_MODE = 'eraser';

let currentColor = DEFAULT_COLOR;
let gridSize = gridSlider.value;
let activeMode = COLOR_MODE;
let mousedown = false;

document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

colorPicker.onchange = () => checkMode();
