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

buttons.forEach(item => { item.addEventListener('click', e => {
        let targetId = e.target.getAttribute('id');
        
        switch(targetId) {
            case 'color-mode': e.target.classList.add('active');
                        randomMode.classList.remove('active');
                        eraser.classList.remove('active');
                        activeMode = COLOR_MODE;
                        checkMode();
            break
            case 'rnd-color': e.target.classList.add('active');
                        colorMode.classList.remove('active');
                        eraser.classList.remove('active');
                        activeMode = RANDOM_MODE;
                        checkMode();
            break
            case 'grid-lines': e.target.classList.toggle('active');
                            const grids = [...gridContainer.children];
                            if(e.target.className == 'active') {
                                for(item of grids) {
                                    checkGridLines(item);
                                }
                                console.log('gridlines acive');
                                return
                            }
                            for(item of grids) {
                                item.style.border = 'none';
                            }
                            console.log('lines not active');
            break
            case 'eraser': e.target.classList.add('active');
                        colorMode.classList.remove('active');
                        randomMode.classList.remove('active');
                        activeMode = ERASER_MODE;
                        checkMode();
            break
            case 'clear': clearAll(ERASER_COLOR);
            break
        }
    });
})
gridSlider.oninput = e => setupGrid(e.target.value);

