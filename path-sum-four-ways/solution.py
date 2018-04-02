from graph import Graph

matrix = []

with open('p083_matrix.txt') as file:
    for line in file.readlines():
        currentline = [int(n) for n in line.split(',')]
        matrix.append(currentline)

numGraph = Graph()

# add each node first
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        numGraph.addNode((i, j))

# then map edges
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if i == 0 and j == 0:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
        
        elif i == 0 and j == len(matrix[i]) - 1:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])
        
        elif i == len(matrix) - 1 and j == 0:
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])

        elif i == len(matrix) - 1 and j == len(matrix[i]) - 1:
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])

        elif i == 0:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])

        elif i == len(matrix) - 1:
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])

        elif j == 0:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])

        elif j == len(matrix[i]) - 1:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])

        else:
            numGraph.addEdge((i, j), (i + 1, j), matrix[i + 1][j])
            numGraph.addEdge((i, j), (i, j + 1), matrix[i][j + 1])
            numGraph.addEdge((i, j), (i - 1, j), matrix[i - 1][j])
            numGraph.addEdge((i, j), (i, j - 1), matrix[i][j - 1])

endCoordinates = (len(matrix) - 1, len(matrix[0]) - 1)
shortestPathMap = numGraph.aStarSearch((0, 0), endCoordinates)

shortestPath = numGraph.outputPath(shortestPathMap, (0, 0), endCoordinates)

print(sum([matrix[c[0]][c[1]] for c in shortestPath]))
