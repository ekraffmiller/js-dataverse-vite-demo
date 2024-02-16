import {ChangeEvent, useState} from 'react';
import {DatasetPreview, getAllDatasetPreviews} from "@iqss/dataverse-client-javascript";
// @ts-ignore
import {Button} from "@iqss/dataverse-design-system";
import {Table}   from "@iqss/dataverse-design-system";
import {Form} from "@iqss/dataverse-design-system";
import {ApiConfig} from "@iqss/dataverse-client-javascript/dist/core";
import {DataverseApiAuthMechanism} from "@iqss/dataverse-client-javascript/dist/core/infra/repositories/ApiConfig";
// Define the type for your object


export function DatasetTable()  {
    const [datasetPreviewList, setDatasetPreviewList] = useState<DatasetPreview[]>([]);
    const [apiKey, setApiKey] = useState(''); // Assuming you have an apiKey state

    // Function to handle the API Key input changes
    const handleApiKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {  value } = event.target
        console.log('value' + value)
        setApiKey(value)
        console.log('apiKey' + apiKey)
        ApiConfig.init('http://localhost:8000/api/v1', DataverseApiAuthMechanism.API_KEY, value)

    }


    // Action to populate the table
    const populateTable = () => {
        getAllDatasetPreviews.execute().then((datasetPreviewSubset) => {
            setDatasetPreviewList(datasetPreviewSubset.datasetPreviews);
        });

    };

    return (
        <div>

            {!apiKey && (
               <Form>
                <Form.Group controlId="basic-form-apikey">
                <Form.Group.Label>API Key</Form.Group.Label>
                <Form.Group.Input value={apiKey}
                                  onChange={handleApiKeyChange}  type="text" placeholder="API Key" />
                </Form.Group>
                </Form>
                )}
            {apiKey && (
                <>
            <Button onClick={populateTable}>Populate Table</Button>
            <Table>
                <thead>
                <tr>
                    <th>citation</th>
                    <th>Create Time</th>
                    <th>Title</th>
                    <th>Version State</th>
                </tr>
                </thead>
                <tbody>
                {datasetPreviewList.map(datasetPreview => (
                    <tr key={datasetPreview.versionId}>
                        <td>{datasetPreview.citation}</td>
                        <td>{datasetPreview.versionInfo.createTime.toUTCString()}</td>
                        <td>{datasetPreview.title}</td>
                        <td>{datasetPreview.versionInfo.state}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </>

)}
        </div>
    )
}

