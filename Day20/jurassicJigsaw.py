from collections import defaultdict
import numpy as np
from math import sqrt

FILE_NAME = "input.txt"

with open(FILE_NAME, 'r') as file:  #save input in 3D array
    all_images = []
    image = []
    ides = defaultdict(int)
    index = 0
    for line in file:
        if not line.split():
            continue
        if "Tile" in line:
            if image:
                all_images.append(image)
            id = int(line.split()[1][:-1])
            ides[index] = id
            image = []
            index += 1
        else:
            new = []
            for character in line.strip():
                new.append(character)
            image.append(new)
    all_images.append(image)


def get_borders(matrix, reverse=False):  #return borders of image, usually in format: first row, first column, last row, last column => fr, fc, lr, lc
    if not reverse:
        return matrix[0, :], matrix[:, 0], matrix[len(matrix)-1, :], matrix[:, len(matrix[0])-1]
    return matrix[len(matrix) - 1, :], matrix[:, len(matrix[0]) - 1], matrix[0, :], matrix[:, 0] #when finding new image, we need borders reversed => lr, lc, fr, fc


def find_first(dicto):  #find first corner image - from it we will add neoghbouring images
    pointings = ["fr", "fc", "lr", "lc"]
    for key, first_images in dicto.items():
        neigbhours = []
        for neigh_key, second_images in dicto.items():
            found_neighbour = False
            if neigh_key == key:
                continue
            for first_image in first_images:
                if found_neighbour:
                    break
                first_key_borders = get_borders(first_image)
                for second_image in second_images:
                    if found_neighbour:
                        break
                    neighbour_borders = get_borders(second_image)
                    for first_index, first_border in enumerate(first_key_borders):
                        if found_neighbour:
                            break
                        for second_index, second_border in enumerate(neighbour_borders):
                            if (first_border == second_border).all():
                                neigbhours.append((first_image, pointings[first_index], pointings[second_index]))
                                found_neighbour = True
                                break
        if len(neigbhours) == 2:
            return key, neigbhours


def set_first_positions(first_pointing, second_pointing):  #set correct position of first image according to flip and rotation
    fr, fc = None, None
    if first_pointing == "fr":
        fr = RESOLUTION - 1
    elif first_pointing == "lr":
        fr = 0
    elif first_pointing == "fc":
        fc = RESOLUTION - 1
    else:
        fc = 0
    if second_pointing == "fr":
        fr = RESOLUTION - 1
    elif second_pointing == "lr":
        fr = 0
    elif second_pointing == "fc":
        fc = RESOLUTION - 1
    else:
        fc = 0
    return fr, fc


def find_new_position(x, y, r):    #find position of new image according to old image position and touching side
    if r == 0:
        return x-1, y
    if r == 1:
        return x, y - 1
    if r == 2:
        return x+1, y
    return x, y+1

def same(line, loch_line, indeces=[]):  #find if is monster present on this line; possibly should obey found already indeces
    positions_indeces = []
    if not indeces:  #if we are not fixed on some indeces (because of already found indeces of "upper monster body")
        indeces = [start for start in range(len(line)-len(lochness[0]))]  #just create all possible indeces
    for start in indeces:
        loch_pos = 0
        for i in range(start, start + len(lochness[0])):  #find that monster!
            if (line[i] == "#" and loch_line[loch_pos] == "O") or (loch_line[loch_pos] == "."):
                loch_pos += 1
                if loch_pos == len(lochness[0]):
                    positions_indeces.append(start)   #we found monster!
            else:
                loch_pos = 0
    return positions_indeces   #return found indeces


def get_res(image):  #find all monsters for this possible image
    lochs_length = 0
    whole_image = image
    indeces = [(a, a+1, a+2) for a in range(len(whole_image)-2)]  #all possible triplet for monster line indeces
    for i, j, k in indeces:
        line1 = whole_image[i]
        string_line1 = "".join(line1)
        line2 = whole_image[j]
        string_line2 = "".join(line2)
        line3 = whole_image[k]
        string_line3 = "".join(line3)             #transform triplet to lines
        positions = same(string_line1, lochness[0])
        if positions:  #we have to keep up with column index where monster(s) started!
            positions = same(string_line2, lochness[1], positions)
            if positions:   #same, should keep indeces
                positions = same(string_line3, lochness[2], positions)
                lochs_length += 15 * len(positions)    #if monster(s?) found, add their length
    return lochs_length  #return found monster spaces

flip_rotates = defaultdict(list)   #make all possible rotations and flips and save them to map
for i in range(len(all_images)):
    new_arr = all_images[i]
    for r in range(4):
        new_arr = np.rot90(new_arr)
        flip_rotates[i].append(new_arr)
        flip_rotates[i].append(np.flip(new_arr, 0))
        flip_rotates[i].append(np.flip(new_arr, 1))

RESOLUTION = int(sqrt(len(flip_rotates)))  #save length of image (both horizontal and vertical are same, it's a square)


first_image, first_neighbours = find_first(flip_rotates)   #save position of first image
position = [(val[1], val[2]) for val in first_neighbours]
images_positions = defaultdict(list)
first_row, first_column = set_first_positions(position[0][0], position[1][0])
images_positions[first_image] = [(first_row, first_column), first_neighbours[0][0]]

first_result = ides[first_image]
corners = [(0, 0), (0, RESOLUTION - 1), (RESOLUTION - 1, 0), (RESOLUTION - 1, RESOLUTION - 1)]  #save corners positions

queue = [first_image]    #initialize queue with first image
done_indeces = {(first_row, first_column)}
done_indeces.add((first_row, first_column))


while queue:           #find positions of all images(maybe in some flipped/rotated order but correct!):
    existing_index = queue.pop()  #pop last added image from queue
    (row_index, column_index), first_image = images_positions[existing_index]     #get his coordinates...
    first_image_borders = get_borders(first_image)    #...and his borders
    for key, new_images in flip_rotates.items():    #search for new neighbour
        if key in images_positions:      #ignore already solved
            continue
        neigh_arr, pos_index = None, None
        done = False
        found_key = None
        x, y = None, None
        for new_image in new_images:   #take some new image
            new_images_borders = get_borders(new_image, reverse=True) #get his borders in special order
            for first_index, first_border in enumerate(first_image_borders):
                if done:
                    break
                for second_index, second_border in enumerate(new_images_borders):
                    if first_index == second_index:   #compare only logical borders (according to ordering)
                        if (first_border == second_border).all():  #found neighbour! (possibly)
                            x, y = find_new_position(row_index, column_index, first_index)
                            if (0 <= x < RESOLUTION) and (0 <= y <= RESOLUTION) and ((x, y) not in done_indeces): #make sure they're  ok
                                done = True
                                break
            if done:
                break
        if done:  #we found valid neighbour
            images_positions[key] = [(x, y), new_image]  #save his position
            queue.append(key)
            done_indeces.add((x, y))   #make sure we don't look for him again
            if (x, y) in corners:   #if it's also corner, we multiply answer for part 1
                first_result *= ides[key]

# print(f'First part result: {first_result}')

new_image_positions = defaultdict(list)   #here we save cropped images
for key, value in images_positions.items():   #cropping
    x, y = value[0]
    new_image = value[1][1:-1, 1:-1]
    new_image_positions[key] = [(x, y), new_image]

lochness = ["..................O.", "O....OO....OO....OOO", ".O..O..O..O..O..O..."] #sea monster interpretation - O is important
lochs_vals_count = [lochness[0].count("O"), lochness[1].count("O"), lochness[2].count("O")]

whole_image = None
for x in range(RESOLUTION):            #build whole image (possibly rotated/flipper, but correct)
    new_line = None
    for y in range(RESOLUTION):
        for key in new_image_positions.keys():
            if new_image_positions[key][0] == (x, y):  #find image for correct position
                if new_line is None:
                    new_line = new_image_positions[key][1]
                else:
                    current = new_image_positions[key][1]
                    new_line = np.concatenate((new_line, current), axis=1)   #concatenate neighbours
                break
    if whole_image is None:
        whole_image = new_line
    else:
        whole_image = np.concatenate((whole_image, new_line), axis=0)  #concatenate neighbours on 0. axis

loch_max = None

maximal_result = 0
for i in range(len(whole_image)):  # number of # in whole image
    line = whole_image[i]
    string_line = "".join(line)
    maximal_result += string_line.count("#")

second_res = maximal_result
new_image = whole_image
for r in range(4):   #try finding monster for all possible rotations/flip of whole image
    new_image = np.rot90(new_image)
    res = get_res(new_image)
    if res:
        second_res = min(second_res, maximal_result - res)
    res = get_res(np.flip(new_image, 0))
    if res:
        second_res = min(second_res, maximal_result - res)
    res = get_res(np.flip(new_image, 1))
    if res:
        second_res = min(second_res, maximal_result - res)

print(second_res)
