import React from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useLocation } from 'react-router-dom';

const ViewPieceJointe = () => {
    const {state}=useLocation()
    const docs = [
        {
            uri:`/showFile?path=${encodeURI(state.path)}`
        }
    ];
    return (
        <div>
            <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} config={{header:{disableHeader: true}}} />
        </div>
    );
}

export default ViewPieceJointe;
