import React, { FunctionComponent, useState, useEffect } from 'react';
import { Table, Button, Input, Select } from 'semantic-ui-react';
import GoBackButton from '../shared/GoBackButton';
import PersonApi from '../../api/personApi';
import { IKinship } from '../../interfaces/IKinship';
import KinshipApi from '../../api/kinshipApi';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';

type KinshipFormProps = {
    type: string,
}

const KinshipForm : FunctionComponent<KinshipFormProps> = (props) => {

    const history = createBrowserHistory();

    const [localState, setLocalState] = useState({personOne:'', personTwo: '', kinship:''});

    const [listState, setListState] = useState({peopleList:[{}], 
        kinshipList: [{key:'1', value:'1', text:'Father'}, {key:'2', value:'2', text:'Mother'}, {key:'3', value:'3', text:'Brother'}, {key:'4', value:'4', text:'Sister'},
            {key:'5', value:'5', text:'Grandfather'}, {key:'6', value:'6', text:'Grandmother'}, {key:'7', value:'7', text:'Spouse'}]});

    useEffect(() => {
        chargePeople();
    },[])

    function chargePeople(){
        PersonApi.getPeople()
        .then(response => {
            setListState({...listState, "peopleList":(response.map((value:any) => {
                return {"text": (value.name + " " + value.last_name), "value": (value.id + ""), "key": (value.id + "")}
             }))});
        });
    }
    
    function handlePersonOneChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, personOne: value });
        console.log(localState.personOne);
        
    }

    function handleKinshipChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, kinship: value });
        console.log(localState.kinship);
    }

    function handlePersonTwoChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, personTwo: value });
        console.log(localState.personTwo);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const newKinship: IKinship = JSON.parse(`{"idFirstPerson":"${localState.personOne}", "idSecondPerson":"${localState.personTwo}", "idRelationType":"${localState.kinship}"}`);
        KinshipApi.createKinship(newKinship)
        .then(()=>{
            history.goBack();
            toast.info("Kinship created succesfully");
        })
        .catch( err => {
            if(err.response.data.message)
            toast.error(err.response.data.message);
        });
    }

    return(
        <div className="kinship_form_container">
            <form onSubmit={handleSubmit}>
                <h2>Add Kinship</h2>
                <Table basic='very'>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={2}>
                                Person 1:
                            </Table.Cell>
                            <Table.Cell width={10}>
                                <Select id="personO" fluid search placeholder='Person 1' className="input-form" value={localState.personOne} options={listState.peopleList} onChange={handlePersonOneChange}/>  
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell width={2}>
                                Relation:
                            </Table.Cell>
                            <Table.Cell width={10}>
                                <Select id="kinship" fluid placeholder='Kinship' className="input-form" options={listState.kinshipList} type="text" value={localState.kinship} onChange={handleKinshipChange}/>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell width={2}>
                                Person 2
                            </Table.Cell>
                            <Table.Cell width={10}>
                                <Select id="personT" fluid search placeholder='Person 2' className="input-form" value={localState.personTwo} options={listState.peopleList} onChange={handlePersonTwoChange}/>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button className="submit_button" floated='right' type="submit" content="Add" icon="add" />
                <GoBackButton></GoBackButton>
            </form>
        </div>
    );

}

export default KinshipForm;