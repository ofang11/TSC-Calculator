import { useState } from "react";

const KEYS = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "C", "0", "=", "+",
]

export default function Calculator() {
    const [display, setDisplay] = useState("0");

    function handleKey(key) {
        if (key === 'C') {
            setDisplay("0");
            return;
        }

        if (display === '0') {
            setDisplay(key);
        } else {
            setDisplay(display + key);
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