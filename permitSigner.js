/*
Sometimes, it can be required to transfer tokens from another account. Examples:
Rescuing tokens from leaked private key (This scenario is based on that code).
Exchange, auction etc. contracts.
Transferring tokens from an address which has 0 ether.

ERC20 tokens can be transferred by another account via using transferFrom() function. 
Of course, executer of function needs permit to execute transferFrom function. Owner of the address which has tokens can give permit to execute transferFrom() by via 2 methods:
-approve() function: 
If you used decentralized exchange, you might remember first giving permission via approve() function to De-Fi like Uniswap or PancakeSwap.
However, it is required ethers to execute approve() function. Because approve() function should be executed by account which will give allowance.
-permit() function:
permit() function can be executed from any account.
Owner signs allowance information and share sign parametrs with gas payer. Therefore, owner don't require to have ethers or pay gas.

This program uses eth-permit library to generate permit() function's required parameters.

-Kaanayden 4.7.22
*/

const { ethers } = require("ethers");
const { signERC2612Permit } = require('eth-permit');


//Contract's functions
const abi = [

  "function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external"

];


async function main() {

//First part will generate permit values.

let privateKey = "0x000000000000000000000000000000"; //Wallet's private key which will let another address spend it's tokens
let gasPayerPriv = "0x0000000000000000000000000000"; //Wallet's private key to execute the permit function. It might be any account which has ethers.


let spender = "0x0000000000000000000000000000"; //Address to give permit. It can be any account address externally-owned or contract.
let rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //BSC Testnet RPC URL for testing.
let tokenAddress = "0x0000000000000000000000000000"; //Token contract address which will be given transfer permit to
let value = "100000000000000000000000000"; //Permitted amount to spend

const rpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

const signerWallet = new ethers.Wallet(privateKey, rpcProvider); //Wallet object of signer who will give allowance.
const signerAddress = await signerWallet.getAddress();

const allowanceParameters = await signERC2612Permit(signerWallet, tokenAddress, signerAddress, spender, value); //Sign operation
console.log( allowanceParameters ); //Result values can be used manually to execute permit() function with web3 providers and websites like etherscan or bscscan.


//Next part will execute permit() function. If user wants execute manually next part is not required.

const gasPayerWallet = new ethers.Wallet(gasPayerPriv, rpcProvider); //Wallet to execute permit function
tokenContract = new ethers.Contract(tokenAddress, abi, gasPayerWallet); //Token contract to give permit. Gas Payer Wallet will be used to execute permit() function.

const execution = await tokenContract.permit(signerAddress, spender, value, allowanceParameters.deadline, allowanceParameters.v, allowanceParameters.r, allowanceParameters.s);

console.log("Program has ended.");


}

main();
