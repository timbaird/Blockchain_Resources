const IUniswapV2Factory = require('@uniswap/v2-core/build/IUniswapV2Factory.json');
const IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json');
const UniswapV2Pair = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const v3PoolArtifact = require("./abi/UniswapV3PoolABI.json");
const ERC20Artifact = require("./abi/ERC20_ABI.json");

const { ethers } = require("hardhat");
const { parseEther, formatEther } = require("ethers");
const readline = require('readline');

// eth mainchain
const WEBSOCKET = `wss://mainnet.infura.io/ws/v3/0795063bf97f4d3b92e996d0b3bfb44c`;

//const USDC_WETH_v3 = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640';
//const USDT_WETH_PAIR_PANCAKESWAPV2 = '0x17C1Ae82D99379240059940093762c5e4539aba5';
const FACTORY_SUSHI = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';
const ROUTER_SUSHI = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F';
const FACTORY_PANCAKE = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362';
const ROUTER_PANCAKE = '0xEfF92A263d31888d860bD50809A8D171709b7b1c';

const USDT_TOKEN = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const WETH_TOKEN = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

formatUsdc = (raw) => {
    const decimalShift = 10 ** -6;
    return parseFloat(raw) * decimalShift;
}

main = async () => {

    const provider = new hre.ethers.WebSocketProvider(WEBSOCKET);

    const { abi: IUniswapV2FactoryABI } = IUniswapV2Factory;
    
    const factorySushi = new ethers.Contract(FACTORY_SUSHI, IUniswapV2FactoryABI, provider);
    const factoryPancake = new ethers.Contract(FACTORY_PANCAKE, IUniswapV2FactoryABI, provider);

    const pairAddrSushi = await factorySushi.getPair(USDT_TOKEN, WETH_TOKEN);
    const pairAddrPancake = await factoryPancake.getPair(USDT_TOKEN, WETH_TOKEN);

    //const { abi: VUniswapV2PairABI } = UniswapV2Pair;
    //const pairSushi = new ethers.Contract(pairAddrSushi, VUniswapV2PairABI, provider);
    //const pairPancake = new ethers.Contract(pairAddrSushi, VUniswapV2PairABI, provider);

    WethContract =  new ethers.Contract(WETH_TOKEN, ERC20Artifact, provider);
    UsdtContract = new ethers.Contract(USDT_TOKEN, ERC20Artifact, provider);
    
    /*
    const resSushi = await v2Pair1.getReserves();
    const res1Sushi = formatEther(reserves[0]);
    const res2Sushi = formatUsdc(reserves[1]);
    */
    // using token addresses as alternative way to get balanvees

    const resUsdtSushi = await UsdtContract.balanceOf(pairAddrSushi);
    const resWethSushi = await WethContract.balanceOf(pairAddrSushi);
    const ratioSushi = formatUsdc(resUsdtSushi) / formatEther(resWethSushi);

    const resUsdtPancake = await UsdtContract.balanceOf(pairAddrPancake);
    const resWethPancake = await WethContract.balanceOf(pairAddrPancake);
    const ratioPancake = formatUsdc(resUsdtPancake) / formatEther(resWethPancake);

    console.log('\n## Sushi USDT ## ' + formatUsdc(resUsdtSushi));
    console.log('## Sushi WETH ## ' + formatEther(resWethSushi));
    console.log('## Sushi RATIO ## ' + ratioSushi);
    
    console.log('\n## Pancake USDT ## ' + formatUsdc(resUsdtPancake));
    console.log('## Pancake WETH ## ' + formatEther(resWethPancake));
    console.log('## Pancake Ratio ## ' + ratioPancake);
    
    

    try {
        const optimumPancakeSushi = getOptimalTradeSize(resUsdtPancake, resWethPancake, resWethSushi, resUsdtSushi, 0.0003);
        console.log('\nOptimal - Pancake => Sushi : ' + formatUsdc(optimumPancakeSushi).toFixed(1));
        
        // reverse order of dexes
        const optimumSushiPancake = getOptimalTradeSize(resUsdtSushi, resWethSushi, resWethPancake, resUsdtPancake, 0.0003);
        console.log('Optimal - Sushi => Pancake : ' + formatUsdc(optimumSushiPancake).toFixed(1));


        //console.log(formatEther(optimumTradeSize));
    } catch (ex) {
        console.log('HOLY FRUITCAKE BATMAN');
        console.log(ex);
    }

    process.exit(0);

}

                            // y_a     x_a      x_b     y_b      f
function getOptimalTradeSize(aResIn, aResOut,  bResIn, bResOut, fee = 0.003) {
    // reference https://ethereum.stackexchange.com/questions/159056/uniswap-v2-optimal-arbitrage-amount
    // other reference: https://www.youtube.com/watch?v=9EKksG-fF1k&t=25s
    aResIn = parseFloat(aResIn);
    aResOut = parseFloat(aResOut);
    bResIn = parseFloat(bResIn);
    bResOut = parseFloat(bResOut);

    const k = (1 - fee) * bResIn + (1 - fee) ** 2 * aResOut;
    const a = k ** 2;
    const b = 2 * k * aResIn * bResIn;
    const c = (aResIn * bResIn) ** 2 - (1 - fee) ** 2 * aResOut * bResOut * aResIn * bResIn;
    const f = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
    return f;
}


main();