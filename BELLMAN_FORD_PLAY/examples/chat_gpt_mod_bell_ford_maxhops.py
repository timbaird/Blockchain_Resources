import math

# Bellman-Ford algorithm to detect arbitrage with max_edges constraint
def bellman_ford(graph, num_vertices, source, max_edges):
    # Step 2: Initialize distances from source to all vertices
    dist = [float('inf')] * num_vertices
    dist[source] = 0
    predecessor = [-1] * num_vertices  # Track predecessors to reconstruct cycle

    # Step 3: Relax edges repeatedly (up to max_edges times)
    for _ in range(min(max_edges, num_vertices - 1)):
        for u, v, weight in graph:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                predecessor[v] = u

    # Step 5: Check for negative-weight cycles
    for u, v, weight in graph:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            # Negative cycle detected, reconstruct the cycle
            arbitrage_cycle = []
            curr = v
            for _ in range(num_vertices):  # Trace back the cycle
                curr = predecessor[curr]
            cycle_start = curr
            arbitrage_cycle.append(cycle_start)
            curr = predecessor[cycle_start]
            while curr != cycle_start:
                arbitrage_cycle.append(curr)
                curr = predecessor[curr]
            arbitrage_cycle.append(cycle_start)
            arbitrage_cycle.reverse()
            return arbitrage_cycle  # Return the arbitrage cycle

    return None  # No arbitrage found

# Function to detect arbitrage with a max_edges parameter
def detect_arbitrage(exchange_rates, max_edges):
    num_currencies = len(exchange_rates)
    
    # Step 1: Build graph with -log(exchange rates)
    graph = []
    for u in range(num_currencies):
        for v in range(num_currencies):
            if u != v:
                rate = exchange_rates[u][v]
                if rate > 0:
                    graph.append((u, v, -math.log(rate)))

    # Step 4: Apply Bellman-Ford to each currency as the source
    for i in range(num_currencies):
        arbitrage_cycle = bellman_ford(graph, num_currencies, i, max_edges)
        if arbitrage_cycle:
            print("Arbitrage opportunity detected in cycle: ", arbitrage_cycle)
            return arbitrage_cycle

    print("No arbitrage opportunity detected.")
    return None
"""
# Example: Matrix of exchange rates
exchange_rates = [
    [1, 0.5, 0.2],
    [2, 1, 0.8],
    [5, 1.25, 1]
]
"""

# Example: Matrix of exchange rates
exchange_rates = [
    [1, 0.5, 0.2],
    [2, 1, 0.4],
    [5, 2.5, 1]
]


# Set max_edges as the maximum number of edges to be traversed
max_edges = 2  # Limit the traversal to 2 edges
detect_arbitrage(exchange_rates, max_edges)
