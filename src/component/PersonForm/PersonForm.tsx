import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Table, Select,} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

type PersonFormProps = {
    localState:any,
    setLocalState:any
}

const PersonForm: FunctionComponent<PersonFormProps> = (props) => {

    const [localState, setLocalState] = useState({name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',contact: ''});
    const [listState, setListState] = useState({nationalityList:[{}], 
        genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],
        documentTypeList: [{key:'1', value:'CC', text:'CC',}, {key:'2', value:'CE', text:'CE'}, {key:'3', value:'TI', text:'TI'}]});

        useEffect(() => {
            chargeCountries();
        },[])

    const status = "";
        
    function chargeCountries(){
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => setListState({...listState, "nationalityList":(json.map((value:any) => {
            return {"text": value.name, "value": (value.numericCode + ""), "key": (value.numericCode + "")}
         }))}));
    }

    function handleNameChange(event: any) {
        setLocalState({ ...localState, name: event.target.value });
        props.setLocalState({ ...props.localState, name: event.target.value });
    }
    function handleLastNameChange(event: any) {
        props.setLocalState({ ...localState, lastName: event.target.value });
    }
    function handleDocumentTypeChange(event: any, { name, value }: any) {
        props.setLocalState({ ...localState, documentType: value });
    }
    function handleDocumentChange(event: any) {
        props.setLocalState({ ...localState, document: event.target.value });
    }
    function handleDateOfBirthChange(event: any, { name, value }: any) {
        props.setLocalState({ ...localState, dateOfBirth: value });
    }
    function handleGenderChange(event: any, { name, value }: any) {
        props.setLocalState({ ...localState, gender: value });
    }
    function handleNationalityChange(event: any, { name, value }: any) {
        props.setLocalState({ ...localState, nationality: value });
    }
    function handleContactChange (event:any, {name, value}:any) {
        props.setLocalState({...localState,contact: value});
    }


    function datePicker(){
        return(
            <DateInput key="dateOfBirth" fluid className="date-form" name="date"
                placeholder="Date of Birth"
                iconPosition="right"
                onChange={handleDateOfBirthChange} 
                value={localState.dateOfBirth} 
            />
        );
    }

    return(
        <Table.Body >
            <Table.Row >
                <Table.Cell  width={2}>Name:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Input key="name" fluid required maxLength="25" placeholder='Name' className="input-form" type="text" value={localState.name} onChange={handleNameChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Last Name:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Input key="lantName" fluid required maxLength="25" placeholder='Last Name' className="input-form" type="text" value={localState.lastName} onChange={handleLastNameChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Document Type:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Select fluid key="documentType" placeholder='Document Type' className="input-form" options={listState.documentTypeList} type="text" value={localState.documentType} onChange={handleDocumentTypeChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Document:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Input key="document" required fluid placeholder='Document' maxLength={localState.documentType === "CE"? 20:10} className="input-form" type="text" value={localState.document} onChange={handleDocumentChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Date of Birth:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    {datePicker()}
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Gender:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Select key="gender" fluid placeholder='Gender' className="input-form" options={listState.genderList} type="text" value={localState.gender} onChange={handleGenderChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Nationality:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Select key="nationality" fluid search placeholder='Nationality' value={localState.nationality} className="input-form" options={listState.nationalityList} onChange={handleNationalityChange} />
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell  width={2}>Contact:</Table.Cell>
                <Table.Cell  className={status} width={10}>
                    <Input key="contact" required fluid maxLength="30" placeholder='Contact' className="input-form" type="text" value={localState.contact} onChange={handleContactChange} />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    );
}

export default PersonForm;