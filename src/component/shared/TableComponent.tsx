import React from "react";
import ReactTable, { Filter } from "react-table";
import { ITableProps } from "../../interfaces/ITableProps";
import "../../assets/TableComponent.css"
import SearchComponent from './SearchComponent';
import { Grid} from "semantic-ui-react";
import GoBackButton from "./GoBackButton";

class TableComponent extends React.Component<ITableProps> {

    state = {
        filteredObject: Array<any>(),
        filterValue: ""
    }

    onKeyInputEnter = (filtered: string) => {
        const filters: Array<Filter> = this.props.columnsAccessor.map(currentColumn => ({ id: currentColumn, value: filtered }))

        if (filtered.length == 0) {
            this.setState({ filteredObject: [] }) 
        } else{
            this.setState({ filteredObject: filters })
        }
    }

    onFilterChange = (changed: any) => {
        if (this.state.filteredObject.length > 1 && this.state.filterValue.length) {
            const filterAll = "";
            this.setState({
                filteredObject: changed.filter((item: any) => item.id !== "all"),
                filterValue: filterAll
            });
        } else this.setState({ filteredObject: changed });
    }

    public render() {
        return <div className="table-margin">
            <ReactTable
                getTheadFilterProps={() => {
                    return {
                        style:
                            { display: "none" }
                    };
                }}
                getTheadFilterThProps={() => {
                    return {
                        className:
                            "hiddenFilter"

                    };
                }}
                noDataText=""
                loading={this.props.loading}
                data={this.props.data}
                columns={this.props.columns}
                filterable={false}
                filtered={this.state.filteredObject}
                onFilteredChange={this.onFilterChange}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20]}
            >
                {(state, makeTable) => {
                    return (
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <SearchComponent data={state} searchPlaceHolder={this.props.searchPlaceHolder} handleFilter={this.onKeyInputEnter} />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        {this.props.button()}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            {makeTable()}
                            <br />
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column textAlign="right">
                                        <GoBackButton></GoBackButton>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    );
                }}
            </ReactTable>
        </div>;
    }
}
export default TableComponent;