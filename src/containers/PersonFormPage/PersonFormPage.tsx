import React from 'react';
import PersonForm from '../../component/PersonForm/PersonForm'

type PageFormProps = {
}

class PersonFormPage extends React.Component<PageFormProps> {
    constructor(props: any){
        super(props);        
        
    }
    findAllItems() {
        
    }
    render(){
        return(
            <div className="CreatePerson">
                <PersonForm findAllItems={this.findAllItems}/>
            </div>
        );
    }
}

export default PersonFormPage;