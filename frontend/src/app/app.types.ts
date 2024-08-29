export interface Operation {
    symbol: "+" | "-" | "*" | "/";
    name: "Add" | "Subtract" | "Multiply" | "Divide";
    func: () => void
}

export interface Calculation {
    num1: number,
    num2: number,
    result: number,
    operation: "Add" | "Subtract" | "Multiply" | "Divide";
    timestamp: string
}
