

import React, { useContext, useState } from 'react';
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Login() {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setUser({ name: username, email: email, isLoggedIn: true });
        if (username.toLowerCase() === 'admin') {
            navigate('/add-product');
        } else {
            navigate('/home');
        }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <div className="language-switcher mb-3">
                        <Button variant="outline-primary" onClick={() => changeLanguage('en')}>English</Button>
                        <Button variant="outline-primary" onClick={() => changeLanguage('es')}>Español</Button>
                        {/* Add more languages as needed */}
                    </div>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <h1>{t('Login')}</h1>
                            <Form.Label>{t('Username')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('Enter username')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="emailInput" className="mb-3">
                            <Form.Label>{t('Email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('Enter email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="passwordInput" className="mb-3">
                            <Form.Label>{t('Password')}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t('Enter password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t('Login')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
