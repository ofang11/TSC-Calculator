// precedence set to determine order of operations
const PRECEDENCE = { "+": 1, "-": 1, "*": 2, "/": 2 };

// basic operations
function basic_op(a, b, op) {
    if (op === "+") {
        return a + b;
    } else if (op === "-") {
        return a - b;
    } else if (op === "*") {
        return a * b;
    } else {
        return a / b;
    }
}

// token is an array made up of numbers and strings (operations)
export default function Evaluate(tokens) {
    const vals = [];
    const ops = [];

    // compute THIS operation (the latest one)
    const do_op = () => {
        const b = vals.pop();
        const a = vals.pop();
        const op = ops.pop();

        const res = basic_op(a, b, op);
        vals.push(res);
    }

    // loop through every token
    for (const tok of tokens) {
        // if it is a number, add to the value list
        if (typeof tok === "number") {
            vals.push(tok);
            continue;
        }

        // if it is an operation, check whether the operation takes precedence over the cached operations
        while (ops.length && PRECEDENCE[ops[ops.length - 1]] >= PRECEDENCE[tok]) {
            // if this operation does NOT take place first, then pop stashed operations until equal precedence is reached
            // then append this operation to list of operations
            do_op()
        } ops.push(tok);
    }

    // at this point, all operations should be of equal precedence, so complete them left to right
    while (ops.length) {
        do_op()
    }

    return vals[0];
}