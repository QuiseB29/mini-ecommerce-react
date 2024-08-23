import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function SearchResults() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            fetch(`https://fakestoreapi.com/products`)
                .then((res) => res.json())
                .then((data) => {
                    const filteredProducts = data.filter((product) =>
                        product.title.toLowerCase().includes(query.toLowerCase())
                    );
                    setProducts(filteredProducts);
                });
        }
    }, [location.search]);

    return (
        <Container className="mt-4">
            <h2>Search Results</h2>
            <Row>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                            <div className="product-card">
                                <img src={product.image} alt={product.title} className="img-fluid" />
                                <h5>{product.title}</h5>
                                <p>${product.price}</p>
                            </div>
                        </Col>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </Row>
        </Container>
    );
}

export default SearchResults;

