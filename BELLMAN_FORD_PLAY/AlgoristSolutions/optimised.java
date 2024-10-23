
// exchangeRates[0] = currency A
// exchangeRates[1] = currency B
// exchangeRates[2] = exchange rate to convert from currency A to currency B
public void getArbitrage(String[][] exchangeRates, int numberOfCurrencies) {
    // create complete network
    EdgeWeightedDigraph G = new EdgeWeightedDigraph(numberOfCurrencies);
    for (int[] exchangeRate : exchangeRates) {
            DirectedEdge e = new DirectedEdge(exchangeRate[0], exchangeRate[1], -Math.log(exchangeRate[2]));
            G.addEdge(e);
        }
    }

    // run Bellman-Ford Shortest Paths Algorithm
    BellmanFordSP spt = new BellmanFordSP(G, 0); // take any currency/vertex as source vertex. Here are taking 0 as source

if (spt.hasNegativeCycle()) {
        double stake = 1000.0;
        for (DirectedEdge e : spt.negativeCycle()) {
            StdOut.printf("%10.5f %s ", stake, name[e.from()]);
            stake *= Math.exp(-e.weight());
            StdOut.printf("= %10.5f %s\n", stake, name[e.to()]);
        }
    }
    else {
        StdOut.println("No arbitrage opportunity");
    }
}