const KEYS = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "C", "0", "=", "+",
]

export default function Keypad({ onKeyPress }) {
    return (
        <div className="keys">
            {KEYS.map((k) => (
                <button key={k} onClick={() => onKeyPress(k)}>
                    {k}
                </button>
            ))}
        </div>
    );
}