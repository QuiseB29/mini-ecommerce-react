import { useState } from 'react';
import { Form, FormControl, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

function NavigationBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Shop Now</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeClassName="active">
                        Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/home" activeClassName="active">
                       Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/cart" activeClassName="active">
                        Cart
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/search" activeClassName="active">
                        Search
                    </Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearch}>
                    <FormControl
                        type="text"
                        placeholder="Search Products"
                        className="mr-sm-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-light" type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
