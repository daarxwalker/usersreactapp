import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';

const Navigation = () => {
    return (
        <Header>
            <Container>
                <Menu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/posts">Posts</NavLink>
                </Menu>
            </Container>
        </Header>
    );
};

export default Navigation;