import React, { Component } from 'react';


class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        console.log('Comments');
        console.log('Show preloader');
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data
                });

                console.log(this.state);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Comments</h1>
                <ul>
                    {this.state.data.map((item, key) => {
                        return <li key={key}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Comments;