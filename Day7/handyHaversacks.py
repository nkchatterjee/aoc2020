import re

# construct a directed graph satisfying all dependencies of the bags (i.e., outer bag have an edge going towards all the inner bags).
adj = {}
visited = {}
with open("input.txt") as file:
    for line in file:
        # Every line in the input was in the format outerbags contain x innerbags, y innerbags, so on..
        # So we can split every line into two parts using the word "contain " as separator.
        # As split funtion returns a list, we now have outerbag name as first element and it's dependencies as second element. Unpacked them into two variables as shown below.
        outer_bag, innerbags = line.split("contain ")
        # Now the outer_bag variable has outerbagname with suffix bags in it. We can just slice the string to remove the suffix
        # Similarly, innerbags will now has a string in the format x innerbags, y innerbags, so on..
        # We can extract the count and the innerbag name using regex and grouping as shown below
        innerbags = re.findall(r"(\d{1,}) ([a-z ]+) bag|bags", innerbags)
        # visited list is useful when we are exploring the graph to avoid cycles. Initially we should mark every bag as not visited
        visited[outer_bag[:-6]] = False
        if outer_bag[:-6] not in adj:
            adj[outer_bag[:-6]] = {}
        # Adding edges from outer bag to each inner bag
        for count, bag in innerbags:
            if count and bag:
                if bag not in adj:
                    adj[bag] = {}
                adj[outer_bag[:-6]][bag] = int(count)
# Now we have our adjacency list ready for our directed graph

# We can now find the solution by counting number of vertices(bags) from which we can reach shiny gold bag vertex. - We can solve it by exploring the graph completely or just by exploring only vertices that has an edge going towards the shiny gold bag vertex. (i.e., Simply find the strongly connected components which has shiny gold bag vertex in it)
def part_one(adj, visited, bag_name):
    # dfs of a graph
    def dfs(adj, visited, start, count):
        for edge in adj[start].keys():
            if not visited[edge]:
                visited[edge] = True
                count = dfs(adj, visited, edge, count + 1)
        return count

    # reverse the graph
    adj_reverse = {}
    for outer, inner in adj.items():
        if outer not in adj_reverse:
            adj_reverse[outer] = {}
        for key, count in inner.items():
            if key in adj_reverse:
                adj_reverse[key][outer] = count
            else:
                adj_reverse[key] = {outer: count}
    # Now as the graph is reversed, we can find the vertices that previously had a directed edge towards the shiny gold bag now in new adjacency list at shiny gold vertex.
    # Simply exploring and counting the number of vertices explored from shiny gold bag vertex will be the result
    return dfs(adj_reverse, visited, bag_name, 0)

# Searching the graph using dfs and keeping the count of bags at each level recursively will give the result
def part_two(adj, start, count):
    if not adj[start]:
        return 0
    temp = 0
    for edge, c in adj[start].items():
        temp += c + c * part_two(adj, edge, count)
    count += temp
    return count


print("Part 1: Total number of bag colors that contain at least one shiny gold bag :",
      part_one(adj, visited, "shiny gold"))
print("Part 2: Shiny gold bag contains total {} number of bags".format(
    part_two(adj, "shiny gold", 0)))