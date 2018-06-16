import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, List } from 'semantic-ui-react';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        console.log('Posts');
        fetch('https://jsonplaceholder.typicode.com/posts')
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
            <Container>
                <h1>Posts</h1>
                <List>
                    {this.state.data.map((item, key) => {
                        return <List.Item key={key}><NavLink to={`/post/${item.id}`}>{item.title}</NavLink></List.Item>;
                    })}
                </List>
            </Container>
        );
    }
}

export default Posts;