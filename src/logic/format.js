// for O(1) set operations
export const DIGITS = new Set("0123456789");

// from visual to math operations
export function toOp(op) {
    const op_map = {
        '+': '+',
        '-': '-',
        '÷': '/',
        '×': '*'
    }
    return op_map[op];
}

// from math operation to visual
export function formatToken(t) {
    if (t === "*") {
        return "×";
    } else if (t === "/") {
        return "÷";
    }
    return t;
}

// joining expression together to display full expression in display
export function expressionText(tokens, display, isNewEntry) {
    if (tokens.length === 0) return display;
    const left = tokens.map(formatToken).join(" ");
    return isNewEntry ? left : left + " " + display;
}