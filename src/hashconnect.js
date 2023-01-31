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
const operatorId = AccountId.fromString('0.0.2507940');
const operatorKey = PrivateKey.fromStringED25519('302e020100300506032b65700422042023a796edecfabfcb52eea9eace15bbf1461f2ba48bc1fc50901cb06cad057b93');
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const contractId2 = ContractId.fromString('0.0.7202')
const marketplacecontract = ContractId.fromString('0.0.2637719')
const nftcontract = ContractId.fromString('0.0.2714331')

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

//Payable function 
export const payableFn = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
    console.log(hashconnectData)
    const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
    const signer = hashconnect.getSigner(provider)

    const sendHbarTx = await new ContractExecuteTransaction()
    .setContractId(contractId2)
    .setGas(100000)
    .setPayableAmount(10)
    .setFunction('sendToContract')
    .freezeWithSigner(signer)

    const tx =await sendHbarTx.executeWithSigner(signer)
    console.log(tx, "txxxxxxxxxxxxxx");
}

//Read Function

export const readFn = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const queryTx = await new ContractCallQuery()
        .setContractId(contractId2)
        .setGas(100000)
        .setFunction("checkContractBalance")
            
    console.log(queryTx,"query rx");
    const response =await queryTx.execute(client);
    console.log(response, "response");
    const amount = Uint8ArrToNumber(response.bytes);   
     console.log(amount, "This is response with client");
}

//Read Function 2 

export const readGetFn = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const queryTx = await new ContractCallQuery()
        .setContractId(contractId2)
        .setGas(100000)
        .setFunction("getMobileNumber", new ContractFunctionParameters().addString("hederaboi"))
        .setMaxQueryPayment(new Hbar(1));
            
    console.log(queryTx,"query rx");
    const response =await queryTx.execute(client);
    console.log(response, "response");
    const amount = Uint8ArrToNumber(response.bytes);   
     console.log(amount, "This is response with client");
}

//Write Function 
export const writeFn = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(contractId2)
        .setGas(100000)
        .setFunction("setMobileNumber", new ContractFunctionParameters().addString("ankit").addUint256("888"))
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}

//Create NFT smart Contract
//Create Collection
/**
 * @param Collectionname 
 * @param collectionsymbol
 */

export const nftSmartContract = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setFunction("createNFTContract", new ContractFunctionParameters().addString("Test protocol").addString("")) //param
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}



export const Mint = async() =>{
    const read = await readLXP()
     console.log('read--------->',read)
      if (read) {
        const nftcontract1 = ContractId.fromString(read)
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(nftcontract1)
        .setGas(10000000)
        .setFunction("Mint", new ContractFunctionParameters().addUint256("1").addStringArray(["www.nft.com"]))
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}}

export const readLXP = async () => {
     const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
      console.log(hashconnectData) 
      const provider = hashconnect.getProvider('testnet', hashconnectData.topic, hashconnectData.pairingData[0].accountIds[0]) 
      console.log(provider, "provider log");
       const signer = hashconnect.getSigner(provider)
        console.log(signer, "signer ssssssssssssss");
         const queryTx = await new ContractCallQuery().setContractId(marketplacecontract).setGas(1000000).setFunction("contra").setMaxQueryPayment(new Hbar(10)); 
         console.log(queryTx, "query rx"); 
         const response = await queryTx.execute(client); 
         console.log(response, "response"); 
         const amount = Uint8ArrToNumber(response.bytes);
          console.log(`0.0.${amount}`, "This is response with client");
           return `0.0.${amount}` }

export const approval = async() =>{
    const read = await readLXP()
     console.log('read--------->',read)
      if (read) {
        const nftcontract2 = ContractId.fromString(read)
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");

        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(nftcontract2)
        .setGas(10000000)
        .setFunction("approve", new ContractFunctionParameters().addAddress("0x00000000000000000000000000000000002eafcd").addUint256("1"))
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");  
}
}
//Create Market item


export const createMarketItem = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
    
        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setPayableAmount(0.025)
        .setFunction("createMarketItem", new ContractFunctionParameters().addAddress("0x00000000000000000000000000000000002eafcd").addUint256("1").addUint256("0.025")) //param
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}
