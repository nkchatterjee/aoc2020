const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

interface Instruction {
  operation: "acc" | "jmp" | "nop";
  argument: number;
}

const instructions: Instruction[] = [];

lines.forEach((line) => {
  const [operation, argument] = line.split(" ");

  const instruction: Instruction = {
    operation: operation as "acc" | "jmp" | "nop",
    argument: parseInt(argument),
  };

  instructions.push(instruction);
});

const { visitedInstructions } = run(instructions);

const possiblyFaultyInstructions = [
...visitedInstructions,
].filter((instruction) => ["jmp", "nop"].includes(instruction.operation));

for (const possiblyFaultyInstruction of possiblyFaultyInstructions) {
  // Temporarily save the initial operation. We use this to reset the instruction later.
  const initialOperation = possiblyFaultyInstruction.operation;

  // Change the operation. (jmp -> nop | nop -> jmp)
  possiblyFaultyInstruction.operation =
    initialOperation === "jmp" ? "nop" : "jmp";

  // Run the program with the changed instruction.
  const { exitCode, accumulator } = run(instructions);

  // This run was successful. Return the value of `accumulator`.
  if (exitCode === 0) {
    console.log(accumulator);
  }

  // This instruction was not faulty. Reset to its initial operation.
  possiblyFaultyInstruction.operation = initialOperation;
}

interface RunResult {
  exitCode: number;
  accumulator: number;
  visitedInstructions: Set<Instruction>;
}

function run(instructions: Instruction[]): RunResult {
  let exitCode = 0;
  let accumulator = 0;

  let position = 0;
  let instruction = instructions[position];

  const visitedInstructions = new Set<Instruction>();

  while (instruction) {
    if (visitedInstructions.has(instruction)) {
      exitCode = 1;
      break;
    }

    switch (instruction.operation) {
      case "acc":
        accumulator += instruction.argument;
        position++;
        break;
      case "jmp":
        position += instruction.argument;
        break;
      case "nop":
        position++;
        break;
    }

    visitedInstructions.add(instruction);
    instruction = instructions[position];
  }

  return { exitCode, accumulator, visitedInstructions };
}