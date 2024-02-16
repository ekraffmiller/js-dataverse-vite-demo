import  { useState } from 'react';
import {DatasetPreview, getAllDatasetPreviews} from "@iqss/dataverse-client-javascript";
import {Button} from "@iqss/dataverse-design-system";

// Define the type for your object


export function DatasetTable()  {
    const [datasetPreviewList, setDatasetPreviewList] = useState<DatasetPreview[]>([]);

    // Action to populate the table
    const populateTable = () => {
        getAllDatasetPreviews.execute().then((datasetPreviewSubset) => {
            setDatasetPreviewList(datasetPreviewSubset.datasetPreviews);
        });

    };

    return (
        <div>
            <Button onClick={populateTable}>Populate Table</Button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {datasetPreviewList.map(datasetPreview => (
                    <tr key={datasetPreview.citation}>
                        <td>{datasetPreview.versionInfo.createTime.toUTCString()}</td>
                        <td>{datasetPreview.title}</td>
                        <td>{datasetPreview.versionInfo.state}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

