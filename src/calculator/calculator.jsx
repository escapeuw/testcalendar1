import './calculator.css'
import React from 'react'


class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        curVal: '0',
        prevVal: '0',
        operator: '',
        formula: '',
        output: '0'
      }
      this.handleNumbers = this.handleNumbers.bind(this);
      this.handleOperators = this.handleOperators.bind(this);
      this.handleDecimals = this.handleDecimals.bind(this);
      this.handleEquals = this.handleEquals.bind(this);
      this.initialize = this.initialize.bind(this);
    }
    
    handleNumbers(e) {
      const val = e.target.value;
      const lastIndex = this.state.formula.length;
   
      if (!this.state.output.includes('DIGIT')) {
      if (this.state.output.length > 18) {
        const temp = this.state.output;
        this.setState(state => ({
          output: 'DIGIT LIMIT MET'
        }))
        setTimeout(() => {
          this.setState(state => ({
            output: temp
          }))
        }, 1500)
        return;
      }
      if (this.state.output[0] === '0' && this.state.formula === '') {
        this.setState(state => ({
          formula: val,
          operator: '',
          output: val
        }))
      } else if (this.state.output[0] === '0' && this.state.output.length === 1) {
        this.setState(state => ({
          formula: state.formula.substring(0, lastIndex - 1) + val,
          output: val
        }))
      } else if (this.state.operator !== '') {
        this.setState(state => ({
          formula: state.formula + val,
          operator: '',
          output: val
        }))
      } else {
      this.setState(state => ({
        formula: state.formula + val,
        operator: '',
        output: state.output + val
      }))
      } 
     }
    }
    
    handleDecimals(e) {
      const val = e.target.value;
      const regex = /[+/\x-]/;
      if (!this.state.output.includes('DIGIT')) {
      if ((this.state.output === '0' && this.state.formula === '') || (regex.test(this.state.output))) {
        this.setState(state => ({
          formula: state.formula + '0' + val,
          operator: '',
          output: '0' + val
        }))
      } else if (!this.state.output.includes(".")) {
        this.setState(state => ({
          formula: state.formula + val,
          operator: '',
          output: state.output + val
        }))
      }
     }
    }
    
    handleEquals(e) {
      const val = e.target.value;
      const replaced = this.state.formula.replace("x", "*");
      const regex = /[+/\*-]/;
      let filter = '';
      if (regex.test(replaced[0])) {
        filter = '0' + replaced;
      } else {
        filter = replaced;
      }
      const result = eval(filter).toString();
   
     if (result === 'Infinity') {
       this.setState(state => ({
           output: 'ERROR'
         }));
       setTimeout(() => {
         this.initialize()
       }, 1000)
       return;
     }
      
     
      if (!this.state.output.includes('DIGIT')) {
      this.setState(state => ({
        formula: state.formula + val + result,
        prevVal: state.curVal,
        curVal: result,
        operator: '',
        output: result
      }))
     }
    }
    
    handleOperators(e) {
      const val = e.target.value;
      const lastIndex = this.state.formula.length;
      /* removes . if no following digits */
      if (this.state.formula[lastIndex - 1] === '.') {
        this.setState(state => ({
          formula: state.formula.substring(0, lastIndex - 1)
        }))
      } else if (this.state.formula.includes('=')) {
        this.setState(state => ({
          formula: state.output  
        }))
      }
      
     if (!this.state.output.includes('DIGIT')) {
      if (this.state.operator.length === 2) {
        this.setState(state => ({
          formula: state.formula.substring(0, lastIndex - 2) + val,
          operator: val,
          output: val
        }))
      } else if (val === '-') {
        this.setState(state => ({
          formula: state.formula + val,
          operator: state.operator + val,
          output: val
        }))
      } else if (this.state.operator !== '') {
        this.setState(state => ({
          formula: state.formula.substring(0, lastIndex - 1) + val,
          operator: val,
          output: val
        }))
      } else {
        this.setState(state => ({
          formula: state.formula + val,
          operator: val,
          output: val
        }))
      }
     }
    }
    
    initialize() {
      this.setState({
        curVal: '0',
        prevVal: '0',
        operator: '',
        formula: '',
        output: '0'
      })
    }
    render() {
      
      return (
        <div> 
          <div className='calculator'>
            <Formula formula={this.state.formula} />
            <Output output={this.state.output} />
            <Buttons equals={this.handleEquals} decimals={this.handleDecimals} operators={this.handleOperators} numbers={this.handleNumbers} init={this.initialize} />
          </div>
        </div>);
    }
  };
  
  class Formula extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <div className="displayFormula">
            {this.props.formula}
          </div>
        </div>
      );
    }
  }
  
  class Output extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (<div className="displayOutput" id="display">{this.props.output}</div>);
    }
  }
  
  class Buttons extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <button id="clear" className="big greyButton" onClick={this.props.init}>AC</button>
          <button id="divide" className="greyButton" value="/" onClick={this.props.operators}>/</button>
          <button id="multiply" className="orangeButton" value="x" onClick={this.props.operators}>x</button>
          <button id="seven" value="7" onClick={this.props.numbers}>7</button>
          <button id="eight" value="8" onClick={this.props.numbers}>8</button>
          <button id="nine" value="9" onClick={this.props.numbers}>9</button>
          <button id="subtract" className="orangeButton" value="-" onClick={this.props.operators}>-</button>
          <button id="four" value="4" onClick={this.props.numbers}>4</button>
          <button id="five" value="5" onClick={this.props.numbers}>5</button>
          <button id="six" value="6" onClick={this.props.numbers}>6</button>
          <button id="add" className="orangeButton" value="+" onClick={this.props.operators}>+</button>
          <button id="one" value="1" onClick={this.props.numbers}>1</button>
          <button id="two" value="2" onClick={this.props.numbers}>2</button>
          <button id="three" value="3" onClick={this.props.numbers}>3</button>
          <button id="equals" className="equal orangeButton" value="=" onClick={this.props.equals}>=</button>
          <button id="zero" value="0" onClick={this.props.numbers} className="big">0</button>
          <button id="decimal" value="." onClick={this.props.decimals}>.</button>    
          </div>
      );
    }
  }

  export default Calculator