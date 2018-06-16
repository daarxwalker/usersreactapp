// POST DETAIL
// ---------------------------------------------
// *
// Breadcrumbs (buttons) to back, or go home
// Title and body
// Comments title
// Comments with image, name, date, text, actions
// Textarea to send comment
// *
// ---------------------------------------------

import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import CommentPhoto from '../assets/images/jenny.jpg'; // Only for dev purpose
import { Container, Comment, Divider, Segment, Form, TextArea, Button } from 'semantic-ui-react';

class UserDetail extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            comments: [],
            fetchesResolved: false
        };
        this.props = props;
        this.id = this.props.match.params.id;

        // Current post
        this.currPostFetch =
            fetch('https://jsonplaceholder.typicode.com/posts/' + this.id)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        post: data
                    });
                })
                .catch(function(error) {
                    console.log(error);
            });

        // Comments of current post
        this.commentsFetch =
            fetch('https://jsonplaceholder.typicode.com/comments?postId=' + this.id)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        comments: data
                    });
                })
                .catch(function(error) {
                    console.log(error);
            });
    }

    componentDidMount() {
        // Wait till all fetches done, then show component
        Promise.all([this.commentsFetch, this.currPostFetch]).then(() => {
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
                    <Segment className="main__block">
                        <Link className="ui primary button" to={`/user/${this.state.post.userId}`}>Back</Link>
                        <Link className="ui secondary button" to="/">Back to users</Link>
                        <h1>
                            {this.state.post.title}
                        </h1>
                        <p>{this.state.post.body}</p>
                        <h3>Comments</h3>
                        <Divider/>
                        <Comment.Group className="comments--full-width">
                            {this.state.comments.map((item, key) => {
                            return <Comment key={key}>
                                <Comment.Avatar src={CommentPhoto} alt="photo"/>
                                <Comment.Content>
                                <Comment.Author as='a'>{item.name}</Comment.Author>
                                <Comment.Metadata>5 days ago</Comment.Metadata>
                                <Comment.Text>{item.body}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                                </Comment.Content>
                            </Comment>;
                            })}
                        </Comment.Group>
                        <Form>
                            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                            <Divider hidden />
                            <div className="align-center"><Button primary>Send comment</Button></div>
                        </Form>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default UserDetail;