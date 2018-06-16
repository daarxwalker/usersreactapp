// HOME
// ---------------------------------------------
// *
// Grid with users, on click -> link to user detail
// *
// ---------------------------------------------

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Grid } from 'semantic-ui-react';
import NoPhoto from './NoPhoto'; // For dev purpose

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fetchesResolved: false
        };
    }

    componentDidMount() {
        // All users
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data
                });
            }).then(() => {
                this.setState({fetchesResolved: true});
            })
            .catch(function(error) {
                console.log(error);
        });
    }

    render() {
        // Show on mount component, after fetches done -> show component
        if (!this.state.fetchesResolved) {
            return (
                <div className="main__loading">
                    <div className="main__loader"/>
                </div>
            )
        }
        return (
            <div className="main__content">
                <Container className="main__container">
                    <Segment className="main__block">
                        <Grid className="users">
                            <Grid.Row>
                                {this.state.data.map((item, key) => {
                                    return <Grid.Column key={key} mobile={16} tablet={8} computer={4}>
                                        <Link className="users__item" to={`/user/${item.id}`}>
                                            <NoPhoto/>
                                            <div className="users__item-info">
                                                <h2 className="users__item-name">{item.name}</h2>
                                                <p className="users__item-phone">{item.phone}</p>
                                            </div>
                                        </Link>
                                    </Grid.Column>;
                                })}
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Home;