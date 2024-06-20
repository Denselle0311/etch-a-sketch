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

function setupGrid(gridSize) {
    let gridTotal = gridSize * gridSize;
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridTotal; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.color = 'false';
        gridItem.addEventListener('mouseover', draw);
        gridItem.addEventListener('mousedown', draw);
        gridContainer.appendChild(gridItem);
        // if(gridContainer.children[i].classList == 'grid-item') {
            //     gridContainer.children[i].style.backgroundColor = ERASER_COLOR;
            // }
        clearAll(ERASER_COLOR);
        checkGridLines(gridItem);
        }
      
        for(let i = gridContainer.childElementCount - 1 ; i >= gridTotal; i--) {
            gridContainer.children[i].remove();
        }
        
        
    gridDisplaySize.innerHTML = `${gridSize} x ${gridSize}`;
    if(activeMode == COLOR_MODE) {
        colorMode.classList.add('active');
    }
}

function checkGridLines(e) {
    // if(gridLines.className != 'active' || e.style.border == '1px solid white') return
    // const GREY = 'grey';
    // const WHITE = 'white';
    // let border = '1px solid ';
    // if(e.style.border == (border + GREY)) {
    //     border += WHITE;
    // } else {
    //     border += GREY;
    // }
    // e.style.border = border;
    if(e.dataset.color == 'true' && gridLines.className == 'active'){
        e.style.border = '1px solid white';
    } 
    else if (e.dataset.color == 'false' && gridLines.className == 'active') {
        e.style.border = '1px solid grey';
    }
}

