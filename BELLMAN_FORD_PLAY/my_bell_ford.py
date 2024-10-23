import math

# runs the bellman ford algorithm for one source
# will need to loop for it to check multiple sources
def bellman_ford(graph, source, max_edges):
    num_vertices = len(graph.vertices)

    #Initialize the distance of the source to 0
    for i in range(num_vertices):
        # if the currency at this vertex is the source vertex then set distance to 0
        if graph.vertices[i].currency == source:
            graph.vertices[i].distance = 0
            break

    
    # Step 3: Relax edges repeatedly (up to max_edges times)
    for _ in range(min(max_edges, num_vertices - 1)):
            #print("1")
            # in each iteration go through each vertex
            for vertex in graph.vertices:
                #print(f"2: {vertex.currency}")
                # for each vertex check the edges leading away from it
                for edge in graph.edges:
                    #print(f"outside {edge}")
                    # if the edges leaves from the current vertice
                    # AND the current vertice has a distance value to wokr with
                    # AND this edge can ceate a faster route
                    if edge.source.currency == vertex.currency and edge.source.distance != float('inf')and edge.source.distance + edge.weight < edge.destination.distance:

                        # record the faster route to the destination
                        edge.destination.distance = edge.source.distance + edge.weight
                        # record that the most efficient path to this node
                        edge.destination.predecessor = {"currency": f"{edge.source.currency}", \
                                                         "exchangePair": f"{edge.source.currency}-{edge.destination.currency}:{edge.exchange}"}

 
    # Step 5: Check for negative-weight cycles
    for edge in graph.edges:
        if edge.source.distance != float('inf') and (edge.source.distance + edge.weight) < edge.destination.distance:
            
            # Negative cycle detected, reconstruct the cycle
            current = edge.destination
            arbitrage_path = []
            arbitrage_path.append(current.predecessor)

            # keep going until we get back to source
            while current.predecessor["currency"] != source:
                
                #find the predeccessor vertex
                for vertex in graph.vertices:
                    if vertex.currency == current.predecessor["currency"]:
                        current = vertex
                        arbitrage_path.append(vertex.predecessor)
                        break


            for i in range(len(arbitrage_path)):
                print(arbitrage_path[i])
            


    
#################################
#################################

# define a vertice

class Vertice:
    currency = "" # the currency of the vertex
    distance = float('inf') # set default start distance as infinite
    predecessor = {"currency": "", "path": ""}

    def __init__(self, _currency):
        self.currency = _currency

    def __str__(self):
        return f"{self.currency} | {self.distance} | {self.predecessor}"


# Define an edge
class Edge:
    source = ""
    destination = ""
    exchange = ""
    weight = float('inf')

    def __init__(self, _source, _destination, _exchange, _weight):
        self.source = _source # source vertice instance
        self.destination = _destination #destination veritce instance
        self.exchange = _exchange # exhange path is on
        self.weight = _weight # -log(price)

    def __str__(self):
        return f"{self.source.currency}-{self.destination.currency} : {self.exchange} : {self.weight}"

# Build the Graph
class Graph:
    vertices = []
    edges = []
    rounding_precision = 10

    def __init__(self, _exchange_rates, _rounding_precision=10):

        self.rounding_precision = _rounding_precision
        num_pairs = len(_exchange_rates)
        currencies = []

        # for each currency pair / exchange combo passed in
        for i in range(num_pairs):

            curr1 = _exchange_rates[i][0]
            curr2 = _exchange_rates[i][1]
            exchange = _exchange_rates[i][2]
            rate = _exchange_rates[i][3]
            inverse_rate = round(1 / rate, self.rounding_precision)

            # keep track of which vertices have already been created
            if curr1 not in currencies:
                currencies.append(curr1)
                v1 = Vertice(curr1)
                self.vertices.append(v1)
            else:
                for v in self.vertices:
                    if v.currency == curr1:
                        v1 = v
                        break

            if curr2 not in currencies:
                currencies.append(curr2)
                v2 = Vertice(curr2)
                self.vertices.append(v2)
            else:
                for v in self.vertices:
                    if v.currency == curr2:
                        v2 = v
                        break

            # populate the list of edges with edges in both directions for each vertex
            if rate > 0:
                self.edges.append(Edge(v1, v2, exchange, -round(math.log(inverse_rate), self.rounding_precision)))
                self.edges.append(Edge(v2, v1, exchange, -round(math.log(rate), self.rounding_precision)))  

#################################
#################################

# Example: Matrix of exchange rates
exchange_rates = [
    ['WETH', 'USDT', 'PANCAKESWAP', 0.2],
    ['WBTC', 'USDT', 'UNISWAP',0.1],
    ['WETH', 'WBTC', 'SUSHISWAP', 2],
    ['MATIC', 'USDT', 'BIGBALLSWAP', 0.5],
    ['MATIC', 'WBTC', 'SUSHISWAP', 5],
    ['WETH', 'MATIC', 'BOLLOCKSSWAPS', 2.5]
]

# Set max_edges as the maximum number of edges to be traversed
max_edges = 1  # Limit the traversal to 2 edges
g = Graph(exchange_rates)

print(bellman_ford(g, 'USDT', max_edges))





