import { useState } from "react";
import Evaluate from "../logic/Evaluate";
import Keypad from "./Keypad";
import Display from "./Display";
import { DIGITS, toOp, expressionText } from '../logic/format';

// Calculator Component
export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [tokens, setTokens] = useState([]);
    const [isNewEntry, setIsNewEntry] = useState(true);

    // key handler, 'C' should clear and reset everything
    function pressClear() {
        setDisplay('0');
        setTokens([]);
        setIsNewEntry(true);
        return;
    }

    // handling equal input
    function pressEqual() {
        if (display === "Error") return;

        const n = Number(display)
        const full = [...tokens, n];
        const result = Evaluate(full);

        // reset calculator to default state after expression is completed
        typeof result != "number" ? setDisplay("Error") : setDisplay((String(result)));
        setIsNewEntry(true);
        setTokens([]);
    }

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

    // handling operation input
    function pressOp(op) {
        if (display === "Error") return;
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

    // key handler
    function handleKey(key) {
        if (key === 'C') return pressClear();
        if (key === '=') return pressEqual();

        if (DIGITS.has(key)) return pressDigit(key);
        const op = toOp(key);
        if (op) return pressOp(op);
    }

    return (
        <div className="calc">
            <Display text={expressionText(tokens, display, isNewEntry)} />
            <Keypad onKeyPress={handleKey} />
        </div>
    )
}