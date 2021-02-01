data=open("input.txt","r").read().strip().split("\n")
data=[list(row) for row in data]

def count_adj_visible(row,col,prev,part1=False):
    s=0
    for rinc,colinc in [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]:
        r=row
        c=col
        while True:
            r=r+rinc
            c=c+colinc
            if(r<0 or r>=len(prev)) or (c<0 or c>=len(prev[row]) or prev[r][c]=="L"):
                break
            if(prev[r][c]=="#"):
                s+=1
                break
            if(part1):
                break
    return s

def solve(table,part1=False):
    table=[row.copy() for row in table]
    while True:
        prev=[row.copy() for row in table]
        for row in range(len(table)):
            for col in range(len(table[row])):
                if(table[row][col]!="."):
                    n=count_adj_visible(row, col, prev,part1)
                    if(n==0 and prev[row][col]=="L"):
                        table[row][col]="#"
                    if(n>=(4 if part1 else 5)and prev[row][col]=="#"):
                        table[row][col]="L"
        if(prev==table):break
    return "\n".join(["".join(row)for row in table]).count("#")

print("part 1 ans =",solve(data,part1=True))
print("part 2 ans =",solve(data))