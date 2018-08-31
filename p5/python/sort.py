import array
import random
start = []
size = 549755813888
bin_0 = []
bin_1 = []
for i in range(size):
    start.append(i)
for i in range(size):
    start[i] = bin(start[i])
    while(len(start[i]) < len(bin(size-1))):
        start[i] = start[i][:2] + '0' + start[i][2:]
steps = len(start[size-1]) - 2
random.shuffle(start)
for j in range(steps):
    for i in range(size):
        if (start[i][len(start[i])-(j+1)] == "0"):
            bin_0.append(start[i])
        else:
            bin_1.append(start[i])
    del start[:]
    start = bin_0 + bin_1
    del bin_0[:]
    del bin_1[:]
print(start)
