import { useState } from "react";

const KEYS = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "C", "0", "=", "+",
]

const DIGITS = new Set(
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
)

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [acc, setAcc] = useState(null);
    const [op, setOp] = useState(null);
    const [pendingOp, setPendingOp] = useState(false);

    function pressDigit(d) {
        if (display == "0") {
            setDisplay(d);
        } else {
            setDisplay(display + d);
        }
        setAcc(display);
    }

    function handleKey(key) {
        if (key == 'C') {
            setDisplay('0');
            return;
        }

        if (DIGITS.has(key)) {
            pressDigit(key);
        } else {
            pressOp(key);
        }
    }

    return (
        <div className="calc">
            <div className="display">{display}</div>
            <div className="keys">
                {KEYS.map((k) => (
                    <button key={k} onClick={() => handleKey(k)}>
                        {k}
                    </button>
                ))}
            </div>
        </div>
    )
}