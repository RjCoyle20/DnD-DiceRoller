import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import DiceImageD20 from "./images/d20.jpg";
import DiceImageD12 from "./images/d12.png";
import DiceImageD10 from "./images/d10.png";
import DiceImageD8 from "./images/d8.png";
import DiceImageD6 from "./images/d6.png";
import DiceImageD4 from "./images/d4.png";

export default function App() 
{
  window.addEventListener('load', () => {

    const numDiceInput = document.getElementById('num-dice-input');
    const dieTypeInput = document.getElementById('die-type-input');
    const modeInput = document.getElementById('mode-input');
    const rollButton = document.getElementById('roll');
    const resetButton = document.getElementById('reset');

    const diceArea = document.getElementById('dice-area');
	const resultArea = document.getElementById('result-area');
	const singleTotalArea = document.getElementById('single-total-area');
	const total = document.getElementById('total');
	const doubleTotalArea = document.getElementById('double-total-area');
	const leftTotal = document.getElementById('left-total');
	const divider = document.getElementById('divider');
	const rightTotal = document.getElementById('right-total');

  for (let i=1; i <=100; i++){
    numDiceInput.innerHTML += `<option value=${i}>${i}</option>`;
  }

  let dice = {
    d20: {
      value: 20,
      label: 'D20',
      image: DiceImageD20,
    }, 
    d12: {
      value: 12,
      label: 'D12',
      image: DiceImageD12,
    }, 
    d10: {
      value: 10,
      label: 'D10',
      image: DiceImageD10,
    }, 
    d8: {
      value: 8,
      label: 'D8',
      image: DiceImageD8,
    }, 
    d6: {
      value: 6,
      label: 'D6',
      image: DiceImageD6,
    }, 
    d4: {
      value: 4,
      label: 'D4',
      image: DiceImageD4,
    }, 
  };
  
  for (die in dice) {
    dieTypeInput.innerHTML += `<option value=${dice[die].value}>${dice[die].label}</option>`;
    diceArea.innerHTML += `<img id="${die}" src='${dice[die].image}' height='80px' alt="${dice[die].label} die" />`;
  }

  const d20 = document.getElementById('d20');
  const d12 = document.getElementById('d12');
  const d10 = document.getElementById('d10');
  const d8 = document.getElementById('d8');
  const d6 = document.getElementById('d6');
  const d4 = document.getElementById('d4');

dice['d20'].obj = d20;
dice['d12'].obj = d12;
dice['d10'].obj = d10;
dice['d8'].obj = d8;
dice['d6'].obj = d6;
dice['d4'].obj = d4;

    rollButton.addEventListener('click', event => {
      event.preventDefault();
      spinDie(dice[`d${dieTypeInput.value}`].obj);
      if(modeInput.value === 'normal'){
        total.style.opacity = 0;
        setTimeout(() =>{
          total.innerHTML = getTotalValue(dieTypeInput.value, numDiceInput.value);
          total.style.opacity = 1;
        }, 600);
      } else {
        leftTotal.style.opacity = 0;
        divider.style.opacity = 0;
        rightTotal.style.opacity = 0;
        setTimeout(() => {
          let leftValue = getTotalValue(dieTypeInput.value, numDiceInput.value);
          let rightValue = getTotalValue(dieTypeInput.value, numDiceInput.value);
          leftTotal.innerHTML = leftValue;
          rightTotal.innerHTML = rightValue;
          divider.style.opacity = 0.5;
          if(modeInput.value === 'advantage'){
            if(leftTotal.innerHTML == Math.max(...[leftValue, rightValue])){
              leftTotal.style.opacity = 1;
              rightTotal.style.opacity = 0.2;
            }else {
              leftTotal.style.opacity = 0.2;
              rightTotal.style.opacity = 1;
            }
          } else {
            if (leftTotal.innerHTML == Math.min (...[leftValue, rightValue])){
              leftTotal.style.opacity = 1;
              rightTotal.style.opacity = 0.2;
            } else {
              leftTotal.style.opacity = 0.2;
              rightTotal.style.opacity = 1;
            }
          }
        }, 600);
      }
    });

    // leaving off on reset button click 
})
  return (
    <div className="App">
      <center>
        <h1>Supreme Dice Roller</h1>
        <div>

        </div>
        <button type="button" class="btn btn-outline-dark">Roll!</button>
      </center>
    </div>
  );
}