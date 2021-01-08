# part 1
with open('input.txt') as file:
    console = file.readlines()
    console = [c[:-1] for c in console]
    console = [{c.split()[0]:int(c.split()[1])} for c in console]

class Program:
    def __init__(self, commands):
        self.commands = commands
        self.pointer = 0
        self.accumulator = 0
        self.history = set()

    def run(self):
        while True:
            # Infinite Loop control
            if self.pointer in self.history:
                print('Infinite Loop ! Accumulator : ', self.accumulator)
                break
            self.history.add(self.pointer)

            com = [(k, v) for k, v in self.commands[self.pointer].items()][0]
            if com[0] == 'nop':
                self.pointer += 1
            elif com[0] == 'acc':
                self.pointer += 1
                self.accumulator += com[1]
            elif com[0] == 'jmp':
                self.pointer += com[1]

program = Program(console)
program.run()