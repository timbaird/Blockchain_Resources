const hre = require("hardhat");
const IUniswapV2Factory = require('@uniswap/v2-core/build/IUniswapV2Factory.json');
const UniswapV2Pair = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json');
const { formatEther } = require("ethers");
//const IERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json');
const EXCHANGES = require('../dataFiles/ethereum_uniswapv2_exchange_addresses.js');
const TOKENS = require('../dataFiles/ethereum_erc20_token_addresses.js');
 
//###############################

const WEBSOCKET_ETHEREUM_MAINCHAIN = `wss://mainnet.infura.io/ws/v3/0795063bf97f4d3b92e996d0b3bfb44c`;
//const WEBSOCKET_LOCALHOST_HARDHAT_FORK = `ws://127.0.0.1:8545/`;

// ##############################
// SETTINGS - CHANGE STUDD HERE, NOT IN CODE BELOW
// ##############################

const WEBSOCKET_IN_USE = WEBSOCKET_ETHEREUM_MAINCHAIN;

// PAIR1 - THE PAIR WE TEST ALL THE OTHER AGAINST
const PRIMARY_TOKEN = 'WBTC';
const PRIMARY_TOKEN_ADDRESS = TOKENS[PRIMARY_TOKEN];

// if set to true gives more verbose output
const DEBUG_MODE = false;

// ##############################
// END OF SETTINGS - DO NOT CHANGE STUFF BELOW HERE
// ##############################

async function checkPairOnDex(exchangeName, tokenName, factory_address, token1_address, token2_address, provider) {
    if (DEBUG_MODE) { console.log(exchangeName) };
    let factory, pair_address, pairContract;
    // get the factory
    try {
        factory = new hre.ethers.Contract(factory_address, IUniswapV2Factory.abi, provider);
        if (DEBUG_MODE) { console.log('success - getting factory') };
    } catch (ex) {
        console.log("problem creating factory");
        console.log(ex.message);
        process.exit(0);
    }

    // get the pair address
    try {
        pair_address = await factory.getPair(token1_address, token2_address);
        if (DEBUG_MODE) { console.log('success - getting pair_address ' + pair_address) };
    } catch (ex) {
        console.log("problem getting pair address ");
        console.log(ex.message);
        process.exit(0);
    }
    
    if (pair_address == '0x0000000000000000000000000000000000000000') {
        console.log(PRIMARY_TOKEN + '-' + tokenName + ' pair NOT available on ' + exchangeName);   
    } else {
        console.log(PRIMARY_TOKEN + '-' + tokenName + ' on ' + exchangeName + ' pair contract address ' + pair_address);   
    }
}
    

//=============================

//console.log("loading main");
main = async () => {
    let provider, pairData;
    try {
        // DO NOT CHANGE HERE, CHANGE THE WEBSOCKET_IN_USE VALUE AT THE TOP OF THE FILE
        provider = new hre.ethers.WebSocketProvider(WEBSOCKET_IN_USE);
        if (DEBUG_MODE) { console.log('success - loading provider') };
    } catch (ex) {
        console.log('problem connecting to blockchain');
        console.log(ex);
        process.exit(0);
    }

    try {
        // for every token in the list
        for (const tokenName in TOKENS) {
            if (DEBUG_MODE) { console.log(tokenName) };
            // don't check a token in the list aainst itself
            if (PRIMARY_TOKEN_ADDRESS != TOKENS[tokenName]) {
                // check if that pair is on the list
                for (const exName in EXCHANGES) {
                    if (DEBUG_MODE) { console.log(exName) };
                    // DO NOT CHANGE HERE, CHANGE TOKEN1_ADDRES AND TOKEN2_ADDRESS VALUES AT THE TOP OF THE FILE
                    pairData = await checkPairOnDex(exName, tokenName, EXCHANGES[exName]['FACTORY'],
                                                        PRIMARY_TOKEN_ADDRESS, TOKENS[tokenName], provider);
                    if (DEBUG_MODE) { console.log('success - running checkPairOnDex()') };
                }
                console.log('-----------------------------\n');
            }
        }
    }
    catch (ex) {
        console.log("problem - running checkPairOnDex()");
        console.log(ex);
        process.exit(0);
    }
    process.exit(0);
}
console.log('\n----------------------------');
console.log("CHECKING EXCHANGES FOR PAIRS BASED ON")
console.log(PRIMARY_TOKEN + ': ' + PRIMARY_TOKEN_ADDRESS);
console.log('-----------------------------');


main();
