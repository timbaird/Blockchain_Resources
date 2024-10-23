/*

polygon uniswapv2 forks:

QuickSwap           https://quickswap.exchange/#/
                    ref:        https://docs.quickswap.exchange/overview/contracts-and-addresses
                    router:    0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff
                    factory:   0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32

SushiSwap           https://www.sushi.com/polygon/cross-chain-swap?chainId1=42161
                    ref:        https://docs.sushi.com/docs/Products/Classic%20AMM/Deployment%20Addresses
                    router:    '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
                    factory:   '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'

ApeSwap             https://apeswap.finance/
                    ref:        https://docs.ape.bond/apeswap-finance/where-dev/smart-contracts
                    router:     0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7
                    factory:    0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6

Dfyn                https://exchange.dfyn.network/perp
                    ref: // no clear got from here: https://polygonscan.com/address/0xa102072a4c07f06ec3b4900fdc4c7b80b6c57429
                            and here: https://polygonscan.com/address/0xe7fb3e833efe5f9c441105eb65ef8b261266423b
                    router:     0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429
                    factory:    0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B

JetSwap             https://polygon.jetswap.finance/
                    ref:        https://docs.jetswap.finance/contracts
                    router:     0x5C6EC38fb0e2609672BDf628B1fD605A523E5923
                    factory:    0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7
                    
Elk Finance         https://elk.finance/
                    ref:        https://docs.elk.finance/further-information/addresses/polygon
                    router :    0xf38a7A7Ac2D745E2204c13F824c00139DF831FFf
                    factory:    0xE3BD06c7ac7E1CeB17BdD2E5BA83E40D1515AF2a

Polycat Finance     https://polycat.finance/
                    ref:        https://docs.polycat.finance/contracts
                    router:     0x94930a328162957FF1dd48900aF67B5439336cBD
                    factory:    0x477Ce834Ae6b7aB003cCe4BC4d8697763FF456FA

uniswap             https://app.uniswap.org/swap?chain=polygon
                    ref:        https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments
                    router:     0xedf6066a2b290C185783862C7F4776A2C8077AD1
                    factory:    0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C

==================================

AAVE polygon flash loan tokens - https://aave.com/docs/resources/parameters

STABLES
        DAI, USDC, USDT, sDAI, LUSD, crvUSD, PYUSD, USDe, sUSDe, USDS

STAPLES
        MATIC, WETH, WBTC, wstETH, cbETH, rETH, weETH, osETH, ETHx, tBTC, cbBTC
        
OTHER
        LINK, GHST, CRV, MKR, SNX, BAL, UNI, LDO, ENS, 1INCH, FRAX, RPL, FXS

=================================

PRIORITISE PAIRS LEADING WITH FLASH LOAN IN

USDC
USDT
WETH
WBTC


AVOID THESE VERSIONS - AS AT 17 OCT 2024 THEY HAVE REALLY LOW AMOUNTS ISSUED SO WILL HAVE LOW LIQUIDITY

USDT
-----
Wormhole_USDT_ADDRESS = '0x9417669fBF23357D2774e9D421307bd5eA1006d2';
axlUSD_ADDRESS = '0xCeED2671d8634e3ee65000EDbbEe66139b132fBf';
* DIFFERENT ONE
Wormhole_USDT_ADDRESS = '0x3553f861dEc0257baDA9F8Ed268bf0D74e45E89C';

USDC
------
WormholeUSDC_ADDRESS = '0x4318CB63A2b8edf2De971E2F17F77097e499459D';
maUSDC_ADDRESS = '0x9719d867A500Ef117cC201206B8ab51e794d3F82';
axlUSDC_ADDRESS = '0x750e4C4984a9e0f12978eA6742Bc1c5D248f40ed';

WBTC
-----
Wormhole_WBTC_ADDRESS = '0x5D49c278340655B56609FdF8976eb0612aF3a0C3';           //Onchain Market Cap $0.00
