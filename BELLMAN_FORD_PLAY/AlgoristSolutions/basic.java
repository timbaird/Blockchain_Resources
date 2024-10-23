public class CurrencyExchange {
    int[] parent;
    int[] distance;

    // exchangeRates[0] = currency A
    // exchangeRates[1] = currency B
    // exchangeRates[2] = exchange rate to convert from currency A to currency B
    //
    // Currencies are labeled as 0 to (N - 1)
    public boolean hasArbitrage(int[][] exchangeRates, int numberOfCurrencies) {
        int[][] adjacencyList = constructAdjacencyList(exchangeRates); // please implement constructAdjacencyList() method yourself 
        int[][] logWeights = new int[numberOfCurrencies][numberOfCurrencies];
        for (int[] exchangeRate : exchangeRates) {
            logWeights[exchangerate[0]][exchangerate[1]] = -Math.log10((double)exchangeRate[2]);
        }

        return !bellmanFord(adjacencyList, logWeights, numberOfCurrencies, 0);
    }

    public boolean bellmanFord(int[][] adjacencyList, int[][] weight, int totalNoOfVertices, int sourceVertex) {
            // initialization starts
            parent = new int[totalNoOfVertices];
            distance = new int[totalNoOfVertices];
            Arrays.fill(distance, Integer.MAX_VALUE);
            distance[sourceVertex] = 0;
            parent[sourceVertex] = -1;
            // initialization ends

            for (int i = 1; i < totalNoOfVertices; i++) { // (|V| - 1) times
                // relax all edges
                for (int vertex = 0; vertex < totalNoOfVertices; vertex++) {
                    vertexRelax(adjacencyList, weight, vertex);
                }
            }

            // check if there is a negative weight cycle
            for (int vertex = 0; vertex < totalNoOfVertices; vertex++) {
                for (int neighboringVertex : adjacencyList[vertex]) {
                    if (distance[neighboringVertex] > distance[vertex] + weight[vertex][neighboringVertex]) {
                        return false;
                    }
                }
            }

            return true;
        }
    }

    private void vertexRelax(int[][] adjacencyList, int[][] weight, int vertex) {
        for (int neighboringVertex : adjacencyList[vertex]) {
            int fromVertex = vertex;
            int toVertex = neighboringVertex;
            int edgeWeight = weight[fromVertex][toVertex];
            if (distance[toVertex] > distance[fromVertex] + edgeWeight) {
                distance[toVertex] = distance[fromVertex] + edgeWeight;
                parent[toVertex] = fromVertex;
            }
        }
    }
}
