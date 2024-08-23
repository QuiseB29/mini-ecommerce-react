import { Container, Navbar, Nav } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';
import ProductCatalog from './ProductCatalog';
import { useTranslation } from 'react-i18next';








const SemanticAppLayout = () => {
    const { t, i18n } = useTranslation

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    
    return (
        <>
        <Navbar bg="light" expand="lg" as="header" role="navigation">
            <Navbar.Brand href="#home">React-Bootstrap Accessibility</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" as="nav" role="menubar">
                    <Nav.Link href="#home" role="menuitem">Home</Nav.Link>
                    <Nav.Link href="#about" role="menuitem">About</Nav.Link>
                </Nav>
                <Nav className="mr-auto" as="nav" role="menubar">
                    <Nav.Link onClick={() => changeLanguage('en')}>English</Nav.Link>
                    <Nav.Link onClick={() => changeLanguage('fr')}>Francais</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>


            <Container as="main">

                <h1>{t('body')}</h1>
                <ProductCatalog /><br />
                <ShoppingCart /><br />
                <UserSelector /><br />

            </Container>

            <Container as="footer" className="text-center">
                2023 Accessible Web Inc 
            </Container>
            
            </>
    );
};

export default SemanticAppLayout;