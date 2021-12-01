import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

const getWeb3 = () => {
    const provider = new HDWalletProvider(
        '',
        'https://speedy-nodes-nyc.moralis.io/7e9361d53693a6e439879bb5/bsc/testnet',
    );
    
    
    const web3 = new Web3(provider);
    return web3
}

export { getWeb3 }
