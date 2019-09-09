import React, { FunctionComponent } from 'react';
import TreeComponent from '../../component/Tree/TreeComponent';
import { Route } from 'react-router-dom';


const TreePage:FunctionComponent = () => {
    return(
      
            <Route component={TreeComponent}/>
        
    );
}

export default TreePage;