const colorPalette = document.querySelector('#color-palette');
const colorPaletteChildren = document.querySelectorAll('.color')
const pixelBoard = document.querySelector('#pixel-board');
const body = document.querySelector('body')

// Para cada elemento do palette adiciona uma das cores geradas aleatoriamente
for (let i = 0; i < colorPaletteChildren.length; i += 1){
  const palette = colorPaletteChildren[i];
  if (i === 0){
    palette.style.backgroundColor = 'black';
  } else{
    palette.style.backgroundColor = colors();
  }
}

// Função que cria cores aleatórias
function colors(){
  // Utilizei a referência abaixo para entender o Math.random para geral números aleatórios
  // ref:https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let r = parseInt(Math.random() * 255);
  let g = parseInt(Math.random() * 255);
  let b = parseInt(Math.random() * 255);
  return `rgb(${r},${g},${b})`
}

// Função que cria a grade de pixels conforme um valor n de elementos
function generatePixel(n){
  if (n == ''){
    alert('Board inválido!')
  } else if (n < 5){
    n = 5
  } else if (n > 50){
    n = 50
  }
  const main = document.querySelector('main');
  // Altera a largura da main conforme o valor n
  let a = n * 40 + 2
  pixelBoard.style.width = `${a}px`;
  // Cria div's dentro de outra div de acordo com o valor de n e j (quantidade de vezes que irá repetir)
  for (let i = 0; i < n; i += 1){
    // Cria as div's pai (linha)
    const pixelDiv = document.createElement('div');
    pixelDiv.classList.add('pixel-div');
    pixelBoard.appendChild(pixelDiv)
    for(let j = 0; j < n; j += 1){
      // Crias as div's filhas (coluna)
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixelDiv.appendChild(pixel);
    }
  }
} 
generatePixel(5);

// Função que remove a grade de pixels existente e chama a função que cria uma nova grade
const btnGenerate = document.querySelector('#generate-board');
btnGenerate.addEventListener('click', generate)
function generate(){
  const pixelBoardChildren = document.querySelectorAll('.pixel')
  for (let value of pixelBoardChildren){
    value.remove()
  }
  const boardSizeValue = document.querySelector('#board-size').value
  generatePixel(Number(boardSizeValue)); 
}
  
// Função que verifica qual dos elementos possui a classe selected para remover e depois adiciona-lá ao elemento que chamou o evento
colorPalette.addEventListener('click', selectColor)
function selectColor(event){
  for(let element of colorPaletteChildren){
    element.classList.remove('selected');
  }
  event.target.classList += ' selected'
}

// Função que adiciona a cor do elemento que possui a classe 'selected' ao elemento que chamou o evento
pixelBoard.addEventListener('click', toPaint)
function toPaint(event){
  const color = document.querySelector('.selected').style.backgroundColor;
  // Verifica se quem chamou o evento não possui a classe 'pixel-div', já que não se deseja pintar a div que engloba os quadrados.
  if (event.target.classList != 'pixel-div'){
    event.target.style.backgroundColor = color;
  }
}
// Função que muda a cor do background para branco ao clicar no botão
const btnClear = document.querySelector('#clear-board');
btnClear.addEventListener('click', clearBoard)
function clearBoard(){
  const pixelBoardChildren = document.querySelectorAll('.pixel')
  for(let element of pixelBoardChildren){
    element.style.backgroundColor = 'white';
  }
}



