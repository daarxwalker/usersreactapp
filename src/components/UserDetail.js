// USER DETAIL
// ---------------------------------------------
// *
// Breadcrumb (button) to back users
// Name of user
// Photo of user - dev purpose only blue square
// Basic info - mail, work, address, phone
// Posts of users in table
// *
// ---------------------------------------------

import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Container, List, Segment, Table, Header } from 'semantic-ui-react';

class UserDetail extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            posts: [],
            fetchesResolved: false
        };
        this.props = props;
        this.id = this.props.match.params.id;

        // Current user
        this.currUserFetch =
            fetch('https://jsonplaceholder.typicode.com/users/' + this.id)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        user: data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });

        // Current users posts
        this.userPostsFetch =
            fetch('https://jsonplaceholder.typicode.com/posts?userId=' + this.id)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        posts: data
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    componentDidMount() {
        // Wait till all fetches done, then show component
        Promise.all([this.currUserFetch, this.userPostsFetch]).then(() => {
            this.setState({fetchesResolved: true});
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
                   <Segment className="main__block users__detail">
                       <Link className="ui secondary button" to="/">Back to users</Link>
                       <h1>{this.state.user.name}</h1>
                       <div className="users__detail-info">
                           <div className="users__detail-img" />
                           <List className="list--custom">
                               <List.Item icon='mail' content={this.state.user &&
                               this.state.user.email}/>

                               <List.Item icon='suitcase' content={this.state.user &&
                               this.state.user.company &&
                               this.state.user.company.name}/>

                               <List.Item icon='marker' content={this.state.user &&
                               this.state.user.address &&
                               this.state.user.address.street +
                               ', ' + this.state.user.address.zipcode +
                               ' ' + this.state.user.address.city}/>

                               <List.Item icon='phone' content={this.state.user &&
                               this.state.user.phone}/>
                           </List>
                       </div>
                       <Header as='h2' attached='top' textAlign="left" className="posts__title">
                           Posts by {this.state.user.name}
                       </Header>
                       <Table className="posts" celled attached>
                           <Table.Body>
                               {this.state.posts.map((item, key) => {
                                   return <Table.Row key={key}>
                                       <Table.Cell><Link className="posts__item" to={`/post/${item.id}`}>{item.title}</Link></Table.Cell>
                                   </Table.Row>;
                               })}
                           </Table.Body>
                       </Table>
                   </Segment>
               </Container>
           </div>
       );

    }
}

export default UserDetail;