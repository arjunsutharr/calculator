import { useState } from "react";
import "./App.css";
import { BsBackspaceFill } from "react-icons/bs";
function App() {
  const [result, setResult] = useState("0");
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("");
  const [operator, setOperator] = useState("");
  const [lastExpression, setLastExpression] = useState("0");

  const handleNumberClick = (num) => {
    if (operator === "") {
      setFirstValue((preValue) => preValue + num);
      setResult((preResult) => (preResult === "0" ? num : preResult + num));
    } else {
      setSecondValue((preValue) => preValue + num);
      setResult(secondValue + num);
    }
    setLastExpression((preExpression) => preExpression + num);
  };

  const handleOperatorClick = (op) => {
    if (operator !== "" && secondValue !== "") {
      calculateResult();
    }

    setOperator(op);

    if (!lastExpression.trim().endsWith(op)) {
      setLastExpression(
        (prevExpression) => prevExpression.replace(/\s+$/, "") + ` ${op} `
      );
    }
  };

  const calculateResult = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    let calculatedResult = 0;
    switch (operator) {
      case "+":
        calculatedResult = num1 + num2;
        break;
      case "-":
        calculatedResult = num1 - num2;
        break;
      case "X":
        calculatedResult = num1 * num2;
        break;
      case "/":
        calculatedResult = num1 / num2;
        break;
      case "%":
        calculatedResult = (parseFloat(num1) / 100) * num2.toString();
        break;
      default:
        break;
    }

    setResult(calculatedResult.toString());
    setFirstValue(calculatedResult.toString());
    setLastExpression(calculatedResult.toString());
    setSecondValue("");
  };

  const handleClear = () => {
    setResult("0");
    setFirstValue("0");
    setSecondValue("");
    setOperator("");
    setLastExpression("0");
  };

  const handleBackspace = () => {
    if (operator === "") {
      setFirstValue((prevValue) => prevValue.slice(0, -1));
      setResult((prevResult) =>
        prevResult.length === 1 ? "0" : prevResult.slice(0, -1)
      );
      setLastExpression((prevExpression) =>
        prevExpression.slice(0, -1).replace(/\s+$/, "")
      );
    } else {
      setSecondValue((prevValue) => prevValue.slice(0, -1));
      setResult((prevResult) =>
        prevResult.length === 1 ? "0" : prevResult.slice(0, -1)
      );
      setLastExpression((prevExpression) =>
        prevExpression.slice(0, -1).replace(/\s+$/, "")
      );
    }
  };

  const handleDecimal = () => {
    if (operator === "") {
      if (!firstValue.includes(".")) {
        setFirstValue((prevValue) => prevValue + ".");
        setResult((prevResult) => prevResult + ".");
        setLastExpression((prevExpression) => prevExpression + ".");
      }
    } else {
      if (!secondValue.includes(".")) {
        setSecondValue((prevValue) => prevValue + ".");
        setResult((prevResult) => prevResult + ".");
        setLastExpression((prevExpression) => prevExpression + ".");
      }
    }
  };

  const handleToggleSign = () => {
    if (operator === "") {
      setFirstValue((parseFloat(result) * -1).toString());
    } else {
      setSecondValue((parseFloat(result) * -1).toString());
    }
    setResult((parseFloat(result) * -1).toString());
  };

  return (
    <div className="App">
      <div className="container">
        <div className={(`${"screen"}`, `${"lastExpression"}`)}>
          {lastExpression}
        </div>
        <div className="screen">{result}</div>
        <div className="keysContainer">
          <div className="key" onClick={handleClear}>
            AC
          </div>
          <div className="key" onClick={handleBackspace}>
            <BsBackspaceFill />
          </div>
          <div className="key" onClick={handleToggleSign}>
            +/_
          </div>
          <div className="key" onClick={() => handleOperatorClick("/")}>
            /
          </div>
          <div className="key" onClick={() => handleNumberClick("7")}>
            7
          </div>
          <div className="key" onClick={() => handleNumberClick("8")}>
            8
          </div>
          <div className="key" onClick={() => handleNumberClick("9")}>
            9
          </div>
          <div className="key" onClick={() => handleOperatorClick("X")}>
            X
          </div>
          <div className="key" onClick={() => handleNumberClick("4")}>
            4
          </div>
          <div className="key" onClick={() => handleNumberClick("5")}>
            5
          </div>
          <div className="key" onClick={() => handleNumberClick("6")}>
            6
          </div>
          <div className="key" onClick={() => handleOperatorClick("-")}>
            -
          </div>
          <div className="key" onClick={() => handleNumberClick("1")}>
            1
          </div>
          <div className="key" onClick={() => handleNumberClick("2")}>
            2
          </div>
          <div className="key" onClick={() => handleNumberClick("3")}>
            3
          </div>
          <div className="key" onClick={() => handleOperatorClick("+")}>
            +
          </div>
          <div className="key" onClick={() => handleOperatorClick("%")}>
            %
          </div>
          <div className="key" onClick={() => handleNumberClick("0")}>
            0
          </div>
          <div className="key" onClick={handleDecimal}>
            .
          </div>
          <div className="key" onClick={calculateResult}>
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
