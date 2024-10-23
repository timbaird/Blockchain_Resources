# Python3 program for Bellman-Ford's single source
# shortest path algorithm.
import math

# Class to represent a graph
class Graph:

    def __init__(self, _num_vertices):
        self.Num_vertices = _num_vertices  # No. of vertices
        self.graph = []

    # function to add an edge to graph
    def addPair(self, _pair, _price, _provider):
        pairList = _pair.split('-')
        # puts in quote / base / negated log of price
        self.graph.append([pairList[1], pairList[0], -round(math.log(_price), 5), _provider])
        # puts in base / quote / negated log of ( 1 / price )
        self.graph.append([pairList[0], pairList[1], -round(math.log(1 / _price), 5), _provider])

    # utility function used to print the solution
    def printArr(self, dist):
        print("Vertex Distance from Source")
        for i in range(self.vertices):
            print("{0}\t\t{1}".format(i, dist[i]))

    # The main function that finds shortest distances from src to
    # all other vertices using Bellman-Ford algorithm. The function
    # also detects negative weight cycle
    def BellmanFord(self, src, maxhops):

        # Step 1: Initialize distances from src to all other vertices
        # as INFINITE

        ## this is the problem not I have changed from integers to crypto symbols

        dist = {}
        dist.update({src: {"dist": 0, "path":[], "lasthop": ""}})

        # Step 2: Relax all edges |V| - 1 times. A simple shortest
        # path from src to any other vertex can have at-most |V| - 1
        # edges

        #for _ in range(self.vertices - 1):
        # need to be able to get back to the currency where we started so have to relaxe for |V|  not |V| - 1
        for _ in range(self.vertices - 1):

            # Update dist value and parent index of the adjacent vertices of
            # the picked vertex. Consider only those vertices which are still in
            # queue
            for u, v, w, p in self.graph:
                # if the vertices haven't been encountered yet add them.
                if u not in dist.keys():
                     dist.update({u: {"dist": float("Inf"), "path":[], "lasthop": ""}})
                if v not in dist.keys():
                     dist.update({v: {"dist": float("Inf"), "path":[], "lasthop": ""}})
                    
                # if the first vertex (u) has been reached already, and 
                # it presents a faster way to et to the second vertex (vertex v)
                # the update the distance recoreded for v
                #print(f"BEFORE {u}-{v} : {p}| dist-{u}: {dist[u]["dist"]} |  this edge: {w} | dist-{v}: {dist[v]["dist"]} path-{u}: {dist[u]["path"]} path-{v}: {dist[v]["path"]}  lasthop: {dist[u]["lasthop"]}")
                #print(f'lasthop != src: {dist[u]["lasthop"] != src}  dist[u]["dist"] != float("Inf"): { dist[u]["dist"] != float("Inf")}  dist[u]["dist"] + w < dist[v]["dist"]: {dist[u]["dist"] + w < dist[v]["dist"]}   ')
                exchangePair = f"{u}-{v}:{p}"

                if dist[u]["lasthop"] != src and \
                     exchangePair not in dist[v]["path"] and \
                     dist[u]["dist"] != float("Inf") and round((dist[u]["dist"] + w), 5) < round(dist[v]["dist"], 5):
                    
                    dist[v]["dist"] = round((dist[u]["dist"] + w),5)
                    dist[v]["path"] = dist[u]["path"].copy()
                    dist[v]["path"].append(exchangePair)
                    dist[v]["lasthop"] = v

                #print(f"AFTER {u}-{v} : {p}| dist-{u}: {dist[u]["dist"]} |  this edge: {w} | dist-{v}: {dist[v]["dist"]} path-{u}: {dist[u]["path"]} path-{v}: {dist[v]["path"]} lasthop: {dist[v]["lasthop"]}\n\n")
    

        # Step 3: check for negative-weight cycles. The above step
        # guarantees shortest distances if graph doesn't contain
        # negative weight cycle. If we get a shorter path, then there
        # is a cycle.
        
        """
        for u, v, w in self.graph:
            if dist[u] != float("Inf") and dist[u] + w < dist[v]:
                print("Graph contains negative weight cycle")
                return
        """

        # print all distance
        #self.printArr(dist)

        for x in dist:
            #if dist[x]["dist"] > 0:
            print(f"{x} {dist[x]["dist"]} {dist[x]["path"]}")

# Driver's code
if __name__ == '__main__':
    print("Bollocks")
    g = Graph(4)
    g.addPair('WETH-USDT', 0.2, 'UNISWAP')
    g.addPair('WBTC-USDT', 0.1, 'SUSHISWAP')
    g.addPair('MATIC-USDT', 0.55, 'BIGBALLSWAP')
    g.addPair('MATIC-WBTC', 4.95, 'PANCAKESWAP')
    g.addPair('MATIC-WETH', 2.5, 'BOLLOCKS')
    g.addPair('WETH-WBTC', 1.99, 'UNISWAP')
    
    # function call
    g.BellmanFord('USDT', 3)


# Initially, Contributed by Neelam Yadav
# Later On, Edited by Himanshu Garg
