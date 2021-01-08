import sys

if __name__ == '__main__':
    adapters = list(sorted(map(int, sys.stdin.read().strip().split('\n'))))
    adapters = [0] + adapters
    valid_arrangements = [1] * len(adapters)
    for index in range(1, len(adapters)):
        valid_arrangements[index] = sum(
            valid_arrangements[src_index]
            for src_index in range(max(0, index - 3), index)
            if adapters[index] - adapters[src_index] <= 3
        )
    print(valid_arrangements[-1])

# # alt parts 1 and 2
# data=""
# with open("input.txt","r") as infile:
#     data=infile.read().strip()
# numbers=list(map(int, data.split("\n")))
# numbers=sorted(numbers)
# diff3=0
# diff1=0
# numbers.append(numbers[-1]+3)
# numbers=[0]+numbers
# memory=[1]
# def no_of_paths(n):
#     s=0
#     for x in range(n-1,-1,-1):
#         if(numbers[n]-numbers[x]<=3):s+=memory[x]
#         else:   break
#     return s
# for x in range(1,len(numbers)):
#     memory.append(no_of_paths(x))
#     diff=numbers[x]-numbers[x-1]
#     if(diff==1):diff1+=1
#     elif(diff==3):diff3+=1
# print("1. ans = ",diff3*diff1)
# print("2. ans =",memory[-1])