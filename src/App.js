import './App.css';
import React, { useState } from 'react';

import {approval,Mint, pairHashpack,  payableFn, readFn, readGetFn, writeFn, nftSmartContract, readLXP, createMarketItem} from './hashconnect'
// import {Mint} from './basicnft'

function App() {
  const [pairingString, setPairingString] = useState('')
    return(
<div>
    Fractional NFT Smart Contract 
<br></br>
<p id='accountid'></p>
        {
          pairingString &&
          <>
            <h1>Pairing string</h1>
            <p>{pairingString}</p>
          </>}
<br></br>
<button onClick={async () => {
          const saveData = await pairHashpack()
          setPairingString(saveData.pairingString)
        }}>Pair wallet</button>     
<br></br>
<button onClick={payableFn}>Send HBAR Payable</button>
<button onClick={readFn}>Read FN</button>
<button onClick={readGetFn}>Read get Fn </button>
<br></br>
<button onClick={writeFn}>WriteFn </button>
<br></br>
<button onClick={nftSmartContract}>CreateNFT smart contract </button>
<br></br>
<button onClick={readLXP}>smart contract address </button>

<br></br>
<button onClick={Mint}>Mint NFT</button>
<br></br>
<button onClick={approval}>approval</button>
<br></br>
<button onClick={createMarketItem}>Create Market Item</button>
</div>
    )
}

export default App;
