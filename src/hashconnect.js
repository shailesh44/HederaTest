

import { HashConnect } from 'hashconnect';
import {
	AccountId,
	PrivateKey,
	Client,
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
	Hbar,
	ContractCreateFlow,
    ContractId,
} from '@hashgraph/sdk';
const  hashconnect = new HashConnect();
const accountId = "";
const operatorId = AccountId.fromString('0.0.46847961');
const operatorKey = PrivateKey.fromStringED25519('dd9732538abff1988b69b0dcaee997f9e52142fe68a58da62d2c5f884080078e');
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const contractId = ContractId.fromString('0.0.49335770')



let appMetadata = {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://absolute.url/to/icon.png"
}

function Uint8ArrToNumber(Uint8Arr) {
    const length = Uint8Arr.length;
  
    let buffer = Buffer.from(Uint8Arr);
    const result = buffer.readUIntBE(0, length);
  
    return result;
  }

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetadata, "testnet", false);

    hashconnect.foundExtensionEvent.once((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })

    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet paired')
        console.log(pairingData)

        const accountId = document.getElementById('accountid')
        accountId.innerHTML = pairingData.accountIds[0]
    })

    return initData
}
export const contractSend = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
    console.log(hashconnectData)
    const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
    const signer = hashconnect.getSigner(provider)

    const sendHbarTx = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(100000)
    .setPayableAmount(10)
    .setFunction('sendToContract')
    .freezeWithSigner(signer)

    const tx =await sendHbarTx.executeWithSigner(signer)
    console.log(tx, "txxxxxxxxxxxxxx");
}


//With hashconnect signer we getting null response
export const contractSign = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const queryTx = await new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("checkContractBalance")
            
    console.log(queryTx,"query rx");
    const response =await queryTx.executeWithSigner(signer);
    console.log(response, "response");
    const amount = Uint8ArrToNumber(response.bytes);   
     console.log(amount, "This is response ");
}

//But same with client its giving the response
export const contractwithclient = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const queryTx = await new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("checkContractBalance")
            
    console.log(queryTx,"query rx");
    const response =await queryTx.execute(client);
    console.log(response, "response");
    const amount = Uint8ArrToNumber(response.bytes);   
     console.log(amount, "This is response with client");
}