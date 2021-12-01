import { getWeb3 } from "./getWeb3";
import Web3 from "web3";


const abi = [{"inputs":[{"internalType":"contract IFactory","name":"factory","type":"address"},{"internalType":"address payable","name":"_feeCollector","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"symbol","type":"string"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"TokenCreated","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"uint256","name":"_supply","type":"uint256"},{"internalType":"uint256","name":"_transferTax","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"DeployDeflationaryToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"uint256","name":"_supply","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"DeployStandardToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"FeeTypes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"}]


//const contract = new web3Back.eth.Contract(abi,"0xa0d3AAfC3aA6be6734d6115F6CC9051c3D2E0206")


const deployStandard = async(web3,name,symbol,decimals,supply) => {
    const contract = new web3.eth.Contract(abi,"0x226e11f1D27Ffee180391C5e2613dccF95d957dE")

    const mainaccArray = await web3.eth.getAccounts()
    const mainacc = mainaccArray[0]
    console.log(mainacc)
    const fee = await contract.methods.FeeTypes('0').call()
    const tx = await contract.methods.DeployStandardToken(name,symbol,decimals,supply,mainacc).send({from: mainacc, value: fee})
    return tx.events[1].address
}

const deployTaxed= async(web3,name,symbol,decimals,supply,tax) => {
    const contract = new web3.eth.Contract(abi,"0x226e11f1D27Ffee180391C5e2613dccF95d957dE")

    const mainaccArray = await web3.eth.getAccounts()
    const mainacc = mainaccArray[0]
    console.log(mainacc)
    const fee = await contract.methods.FeeTypes('1').call()
    const tx = await contract.methods.DeployDeflationaryToken(name,symbol,decimals,supply,tax, mainacc).send({from: mainacc, value: fee})
    return tx.events[1].address
}

export { deployStandard, deployTaxed } 

