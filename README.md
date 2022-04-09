# ERC20-Permit-Signer
A JavaScript program to generate permit values and execute permit function for a ERC20 token.

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
