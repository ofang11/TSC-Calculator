import { useState } from "react";
import Evaluate from "../logic/Evaluate";

const KEYS = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "C", "0", "=", "+",
]

// for O(1) set
const DIGITS = new Set(
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
)

// Calculator Component
export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [tokens, setTokens] = useState([]);
    const [isNewEntry, setIsNewEntry] = useState(true);

    // Handling digit press
    function pressDigit(d) {
        // if this is a fresh entry, just display input digit
        if (isNewEntry) {
            setDisplay(d)
            setIsNewEntry(false);
        } else {
            // if display already has digits, concatenate to form number
            if (display === "0") {
                setDisplay(d);
            } else {
                setDisplay(display + d);
            }
        }
    }

    // from visual to math operations
    function toOp(op) {
        const op_map = {
            '+': '+',
            '-': '-',
            '÷': '/',
            '×': '*'
        }
        return op_map[op];
    }

    // from math operation to visual
    function formatToken(t) {
        if (t === "*") {
            return "×";
        } else if (t === "/") {
            return "÷";
        }
        return t;
    }

    // joining expression together to display full expression in display
    function expressionText() {
        const exp = tokens.map(formatToken).join(" ");
        if (!exp) {
            return display;
        }
        if (isNewEntry) {
            return exp;
        }
        return exp + " " + display;
    }

    // handling operation input
    function pressOp(op) {
        const n = Number(display);

        // treat array as immutable, if operation is being added while last element is an operation then
        // switch the two operations, if not then
        // just add the display and then add the operation to list of tokens
        setTokens((prev) => {
            const last = prev[prev.length - 1];
            const next = typeof last === "string" && isNewEntry ? [...prev.slice(0, -1), op] : [...prev, n, op];
            console.log(next);

            return next;
        });

        setDisplay("0");
        setIsNewEntry(true);
    }

    // handling equal input
    function pressEqual() {
        const n = Number(display)
        const full = [...tokens, n];
        const result = Evaluate(full);

        // reset calculator to default state after expression is completed
        setDisplay(result);
        setIsNewEntry(true);
        setTokens([]);
    }

    // key handler, 'C' should clear everything
    function handleKey(key) {
        if (key === 'C') {
            setDisplay('0');
            setTokens([]);
            setIsNewEntry(true);
            return;
        }

        if (key === '=') {
            pressEqual();
            return;
        }

        if (DIGITS.has(key)) {
            pressDigit(key);
        } else {
            const op = toOp(key);
            if (op) {
                pressOp(op);
            }
        }
    }

    return (
        <div className="calc">
            <div className="display">{expressionText()}</div>
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