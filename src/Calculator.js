import React, { Component } from "react";
import "./css/calculator.css";
import Button from "./components/Button";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "",
      previous: []
    };
  }

  clear = () => {
    this.setState({ current: "0", previous: [], nextisReset: false });
  };

  addToCurrent = symbol => {
    if (["/", "*", "-", "+"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + symbol);
      this.setState({ previous, nextisReset: true });
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") ||
        this.state.nextisReset
      ) {
        this.setState({
          current: symbol,
          nextisReset: false
        });
      } else {
        this.setState({
          current: this.state.current + symbol
        });
      }
    }
  };

  calculate = () => {
    let { current, previous, nextisReset } = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
    }
    this.setState({
      current,
      previous: [],
      nextisReset: true
    });
  };

  render() {
    let { current } = this.state;
    const buttons = [
      { symbol: "C", cols: 3, action: this.clear },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate }
    ];
    return (
      <div className="App">
        {this.state.previous.length > 0 ? (
          <div className="floaty-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}
        <input className="result" value={this.state.current} />
        <div>
          {buttons.map((button, i) => {
            return (
              <Button
                key={i}
                symbol={button.symbol}
                cols={button.cols}
                action={symbol => button.action(symbol)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Calculator;
