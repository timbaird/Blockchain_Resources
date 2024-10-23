const UniswapV2Pair = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const v3PoolArtifact = require("./abi/UniswapV3PoolABI.json");
const { ethers } = require("hardhat");
const { parseEther, formatEther } = require("ethers");
const readline = require('readline');

// eth mainchain
const WEBSOCKET = `wss://mainnet.infura.io/ws/v3/0795063bf97f4d3b92e996d0b3bfb44c`;

//const ROUTER_PANCAKESWAP = '0xEfF92A263d31888d860bD50809A8D171709b7b1c';
////const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const USDC_WETH_v3 = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640';
const USDT_WETH_PAIR_PANCAKESWAPV2 = '0x17C1Ae82D99379240059940093762c5e4539aba5';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let v2Pair;
let v3Pool;

main = async () => {

    const provider = new hre.ethers.WebSocketProvider(WEBSOCKET);

    // UNISWAP V2 SWAP EVENT DETECTION
    const { abi: VUniswapV2PairABI } = UniswapV2Pair;

    v2Pair = new ethers.Contract(USDT_WETH_PAIR_PANCAKESWAPV2, VUniswapV2PairABI, provider);

    v2Pair.on('Swap', (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
        console.log('\n\n BINGO!!!!');
        console.log(
            'Uni V2', '|',
            'pair:', 'POSUSDT-WETH', '|',
            'sender:', sender, '|',
            'ratio0:', ratio0ToPrice(amount0In, amount1Out),
            'ratio1:', ratio1ToPrice(amount1In, amount0Out),
        )
        console.log('\n\n');
    });

    v3Pool = new ethers.Contract(USDC_WETH_v3, v3PoolArtifact, provider);
    
    v3Pool.on('Swap', (sender, recipient, amount0, amount1, srqtPriceX96) => {
        const ratio = sqrtToPrice(String(srqtPriceX96));
        console.log(
            'Uni V3', '|',
            'pair:', 'USDC/WETH', '|',
            'sender:', sender, '|',
            'ratio:', 1/ratio,
        );
    })
 
    rl.question('Return to exit: ', handleExit);

}

function handleExit(choice) {
    v2Pair.off('Swap', () => { });
    v3Pool.off('Swap', () => { })
    process.exit(0);
}

// used to format v3 swap event output
sqrtToPrice = (sqrt) => {
    const numerator = sqrt ** 2;
    const denominator = 2 ** 192;
    let ratio = numerator / denominator;
    const decimalShift = Math.pow(10, -12);
    ratio = ratio * decimalShift;
    return ratio;
}

// used for format v2 swap event output
ratio0ToPrice = (amount0In, amount1Out) => 1/(Number(amount0In)/Number(amount1Out)/10**12)
ratio1ToPrice = (amount1In, amount0Out) => Number(amount1In)/Number(amount0Out)*10**12

main();