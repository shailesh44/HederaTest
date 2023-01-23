import './App.css';
import React, { useState } from 'react';

import {contractSign, pairHashpack, contractSend, contractwithclient} from './hashconnect'

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
        <button onClick={contractSend}>Send HBAR</button>
<button onClick={contractSign}>Interaction</button>
<button onClick={contractwithclient}>InteractionWith client</button>      
</div>
    )
}

export default App;
