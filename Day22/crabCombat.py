data = open("input.txt").read().splitlines()
player1 = list(map(int, data[1:26]))
player2 = list(map(int, data[28:54]))

def game(depth, player1, player2):
    records = {}

    while player1 and player2:
        key = str(player1)+str(player2)
        if key in records:
            return 0
        records[key] = None

        card1 = player1.pop(0)
        card2 = player2.pop(0)

        if len(player1) >= card1 and len(player2) >= card2:
            winner = game(depth+1, player1[:card1], player2[:card2])
        else:
            winner = card2 > card1

        if winner:
            player2.extend([card2, card1])
        else:
            player1.extend([card1, card2])

    if depth == 0:
        return (player2 if winner else player1)

    return winner

windeck = game(0, player1, player2)
print("sum", sum((a+1) * b for a, b in enumerate(reversed(windeck))))