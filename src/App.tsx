import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ApiConfig } from '@iqss/dataverse-client-javascript/dist/core'
import {DataverseApiAuthMechanism} from "@iqss/dataverse-client-javascript/dist/core/infra/repositories/ApiConfig";
import {getDataset} from "@iqss/dataverse-client-javascript";
ApiConfig.init('http://localhost:8000/api/v1', DataverseApiAuthMechanism.API_KEY, '086d4210-ccc7-4567-a736-a96010337cf0')



function App() {
  const [count, setCount] = useState(0)
    const datasetId = 'doi:10.5072/FK2/WNGH3Y';
    const datasetVersionId = '1.0';
    getDataset.execute(datasetId, datasetVersionId).then((dataset) => {
        console.log('Dataset:', JSON.stringify(dataset));
    });
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
