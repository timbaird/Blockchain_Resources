const UniswapV2Pair = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const { abi: VUniswapV2PairABI } = UniswapV2Pair;
const { ethers } = require('ethers');


const iface = new ethers.utils.Interface(VUniswapV2PairABI );
const filter = {
    address: null,  // You can specify a particular contract address or leave it null for all.
    topics: [
        iface.getEventTopic("Swap")  // Listen to the Swap event
    ]
};

// polygn mainchain
const WEBSOCKET = `wss://polygon-mainnet.infura.io/ws/v3/0795063bf97f4d3b92e996d0b3bfb44c`;

let provider;

try {
    // DO NOT CHANGE HERE, CHANGE THE WEBSOCKET_IN_USE VALUE AT THE TOP OF THE FILE
    provider = new ethers.providers.WebSocketProvider(WEBSOCKET)
   // provider = new hre.ethers.WebSocketProvider(WEBSOCKET); 
    console.log('success - loading provider');
} catch (ex) {
    console.log('problem connecting to blockchain');
    console.log(ex);
    process.exit(0);
}

provider.on(filter, (log) => {
    const decoded = iface.decodeEventLog("Swap", log.data, log.topics);
    console.log("Swap detected:", decoded);
    process.exit(0);
});

/*

example output


Swap detected: [
  '0xf3938337F7294fEf84e9B2c6D548A93F956Cc281',
  BigNumber { _hex: '0x25cb937d45351c26', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x3dc7548eab484d44307f', _isBigNumber: true },
  '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57',
  sender: '0xf3938337F7294fEf84e9B2c6D548A93F956Cc281',
  amount0In: BigNumber { _hex: '0x25cb937d45351c26', _isBigNumber: true },
  amount1In: BigNumber { _hex: '0x00', _isBigNumber: true },
  amount0Out: BigNumber { _hex: '0x00', _isBigNumber: true },
  amount1Out: BigNumber { _hex: '0x3dc7548eab484d44307f', _isBigNumber: true },
  to: '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57'
]
Swap detected: [
  '0xE37e799D5077682FA0a244D46E5649F71457BD09',
  BigNumber { _hex: '0x156902', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x15642b', _isBigNumber: true },
  '0x8b0df64a4B2a1542741B1204B827c7A61816505D',
  sender: '0xE37e799D5077682FA0a244D46E5649F71457BD09',
  amount0In: BigNumber { _hex: '0x156902', _isBigNumber: true },
  amount1In: BigNumber { _hex: '0x00', _isBigNumber: true },
  amount0Out: BigNumber { _hex: '0x00', _isBigNumber: true },
  amount1Out: BigNumber { _hex: '0x15642b', _isBigNumber: true },
  to: '0x8b0df64a4B2a1542741B1204B827c7A61816505D'
]


===============

lookup of addresses below


Swap detected: [
  '0xE37e799D5077682FA0a244D46E5649F71457BD09',
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x15642b', _isBigNumber: true },
  BigNumber { _hex: '0x024281528b49030cc11d', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  '0x1111111254EEB25477B68fb85Ed929f73A960582',
  sender: '0xE37e799D5077682FA0a244D46E5649F71457BD09',
  amount0In: BigNumber { _hex: '0x00', _isBigNumber: true },
  amount1In: BigNumber { _hex: '0x15642b', _isBigNumber: true },
  amount0Out: BigNumber { _hex: '0x024281528b49030cc11d', _isBigNumber: true },
  amount1Out: BigNumber { _hex: '0x00', _isBigNumber: true },
  to: '0x1111111254EEB25477B68fb85Ed929f73A960582'
]


0xE37e799D5077682FA0a244D46E5649F71457BD09 // dex?
0x1111111254EEB25477B68fb85Ed929f73A960582 // 1 inch aggregation router
0xE37e799D5077682FA0a244D46E5649F71457BD09 // dex?
0x1111111254EEB25477B68fb85Ed929f73A960582.// ?

*/