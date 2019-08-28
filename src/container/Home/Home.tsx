import React from 'react';
import { Segment, Grid, GridColumn, Menu } from 'semantic-ui-react';
import CreatePersonHomeButton, { } from "../../component/shared/CreatePersonHomeButton";
import ListPersonButton, { } from "../../component/shared/ListPersonButton";
import ListKinshipsButton, { } from "../../component/shared/ListKinshipsButton";

const Home: React.FC<{}> = () => {

    return (
        <div>
            <Grid columns={12} centered>
                <Grid.Row>
                    <Grid.Column mobile={12} tablet={8} computer={8}>
                        <Segment raised color="orange">
                            <h1>Person API</h1>
                            <p>Person API is a proyect about store personal information and their relationships, Person API provides a useful experience with their customers,
                                it uses one of the most popular frontend technology now a days: React and, one of the most important technology for backend development Java. </p>
                            <p>  This proyect was developed by the Colombian team of interns conformed by : Andrés Ariza C., Andrés Castillo P.,
                                Andrés Muñoz M., Sebastian Jiménez N. and Luis Blanco G. with their technician leader Edgar, its Scrum master Ana Cháker and Agustín Ochoa V. as our
                                Product Owner </p>
                        </Segment>
                    </Grid.Column>
                    <GridColumn mobile={12} tablet={4} computer={4}>
                        <Menu inverted  vertical size="large">
                            <Menu.Item>
                                <h1>MENU</h1>
                            </Menu.Item>
                            <Menu.Item >
                                <CreatePersonHomeButton   />
                            </Menu.Item>
                            <Menu.Item>
                                <ListPersonButton />
                            </Menu.Item>
                            <Menu.Item>
                                <ListKinshipsButton />
                            </Menu.Item>
                        </Menu>
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </div >
    );

}

export default Home;