import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, List } from 'semantic-ui-react';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
    }

    componentDidMount() {
        console.log('Users');
        fetch('https://jsonplaceholder.typicode.com/users')
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
                <h1>Users</h1>
                <List>
                    {this.state.data.map((item, key) => {
                        return <List.Item key={key}><NavLink to={`/user/${item.id}`}>{item.name}</NavLink></List.Item>;
                    })}
                </List>
            </Container>
        );
    }
}

export default Users;