import React, {Component} from 'react';

export default class Body extends Component {
    constructor(props) {
        super(props);

        this.headerData = ["date","topic","data"];
        this.state = {
            data: null
        };
    }


    async componentDidMount() {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ title: 'React POST Request Example' })
        };
        console.log("get data from backend");
        const response = await fetch('http://localhost:8080/kafka/data', requestOptions);
        console.log("response: ", response);
        const data = await response.json();
        console.log("data: ", data);

        this.setState({ data: data });

    }

    render() {
        return (
            <header className="main-header visible">
                <div>
                    <table className='tabel' border="2">
                        <thead className='theads' onClick={this.sort}>
                        <tr>
                            {
                                this.headerData.map((head,index)=>
                                    <th key={index}>{head}</th> )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data && this.state.data.map((row,index)=>{
                                console.log("row: ", row);
                                return (<tr key={index}>
                                        {
                                            Object.getOwnPropertyNames(row).map((key1) => <td>{row[key1]}</td>)
                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </header>
        )
    }
}
