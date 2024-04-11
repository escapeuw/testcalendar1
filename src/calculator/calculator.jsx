import './calculator.css'
import React from 'react'
import { useState, useEffect } from "react";

function Calculator() {
  const [curVal, setCurVal] = useState('0');
  const [prevVal, setPrevVal] = useState('0');
  const [operator, setOperator] = useState('');
  const [formula, setFormula] = useState('');
  const [output, setOutput] = useState('0');
    
    
  function handleNumbers(e) {
      const val = e.target.value;
      const lastIndex = formula.length;
   
      if (!output.includes('DIGIT')) {
      if (output.length > 18) {
        const temp = output;
        setOutput('DIGIT LIMIT MET');
        
        setTimeout(() => {
          setOutput(temp)
        }, 1500)
        return;
      }
      if (output[0] === '0' && formula === '') {
        
          setFormula(val);
          setOperator('');
          setOutput(val)
      } else if (output[0] === '0' && output.length === 1) {
  
          setFormula(formula.substring(0, lastIndex - 1) + val);
          setOutput(val);
        
      } else if (operator !== '') {
        
          setFormula(formula + val);
          setOperator('');
          setOutput(val);
        
      } else {
    
        setFormula(formula + val);
        setOperator('');
        setOutput(output + val);
      } 
    }
  }
    
    function handleDecimals(e) {
      const val = e.target.value;
      const regex = /[+/\x-]/;
      if (!output.includes('DIGIT')) {
      if ((output === '0' && formula === '') || (regex.test(output))) {
        
          setFormula(formula + '0' + val);
          setOperator('');
          setOutput('0' + val);
        
      } else if (!output.includes(".")) {
        
          setFormula(formula + val);
          setOperator('');
          setOutput(output + val);
        
      }
     }
    }
    
    function handleEquals(e) {
      const val = e.target.value;
      const replaced = formula.replace("x", "*");
      const regex = /[+/\*-]/;
      let filter = '';
      if (regex.test(replaced[0])) {
        filter = '0' + replaced;
      } else {
        filter = replaced;
      }
      const result = eval(filter).toString();
   
     if (result === 'Infinity') {
       setOutput('ERROR');
       setTimeout(() => {
         initialize()
       }, 1000)
       return;
     }
     
     if (!output.includes('DIGIT')) {
      
        setFormula(formula + val + result);
        setPrevVal(curVal);
        setCurVal(result);
        setOperator('');
        setOutput(result);
      
     }
    }
    
    function handleOperators(e) {
      const val = e.target.value;
      const lastIndex = formula.length;
      let tempFormula = formula;

      if (formula[lastIndex - 1] === '.') {
        tempFormula = formula.substring(0, lastIndex - 1);
        
      } else if (formula.includes('=')) {
        tempFormula = output;
      }
      
      if (!output.includes('DIGIT')) {
     
      if (operator.length === 2) {
       
          setFormula(tempFormula.substring(0, lastIndex - 2) + val);
          setOperator(val);
          setOutput(val);
      
      } else if (val === '-') {
          setFormula(tempFormula + val);
          setOperator(operator + val);
          setOutput(val);
        
      } else if (operator !== '') {
      
          setFormula(tempFormula.substring(0, lastIndex - 1) + val);
          setOperator(val);
          setOutput(val);
        
      } else {
        
          setFormula(tempFormula + val);
          setOperator(val);
          setOutput(val);
      }
     }
    }
    
    function initialize() {
      setCurVal('0');
      setPrevVal('0');
      setOperator('');
      setFormula('');
      setOutput('0');
    }
    return (
        <div> 
          <div className='calculator'>
            <Formula formula={formula} />
            <Output output={output} />
            <Buttons equals={handleEquals} decimals={handleDecimals} operators={handleOperators}
             numbers={handleNumbers} init={initialize} />
          </div>
        </div>
        );
  };
  
  function Formula(props) {
    return (
        <div>
          <div className="displayFormula">
            {props.formula}
          </div>
        </div>
      );
  }
  
  function Output(props) {
    return (
    <div className="displayOutput" id="display">{props.output}</div>
  );
    
  }
  
  function Buttons(props) {
    return (
        <div>
          <button id="clear" className="big greyButton" onClick={props.init}>AC</button>
          <button id="divide" className="greyButton" value="/" onClick={props.operators}>/</button>
          <button id="multiply" className="orangeButton" value="x" onClick={props.operators}>x</button>
          <button id="seven" value="7" onClick={props.numbers}>7</button>
          <button id="eight" value="8" onClick={props.numbers}>8</button>
          <button id="nine" value="9" onClick={props.numbers}>9</button>
          <button id="subtract" className="orangeButton" value="-" onClick={props.operators}>-</button>
          <button id="four" value="4" onClick={props.numbers}>4</button>
          <button id="five" value="5" onClick={props.numbers}>5</button>
          <button id="six" value="6" onClick={props.numbers}>6</button>
          <button id="add" className="orangeButton" value="+" onClick={props.operators}>+</button>
          <button id="one" value="1" onClick={props.numbers}>1</button>
          <button id="two" value="2" onClick={props.numbers}>2</button>
          <button id="three" value="3" onClick={props.numbers}>3</button>
          <button id="equals" className="equal orangeButton" value="=" onClick={props.equals}>=</button>
          <button id="zero" value="0" onClick={props.numbers} className="big">0</button>
          <button id="decimal" value="." onClick={props.decimals}>.</button>    
          </div>
      );
  }

  export default Calculator