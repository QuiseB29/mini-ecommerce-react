import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, checkout } from '../features/cart/cartSlice';
import { Button, ListGroup } from 'react-bootstrap';
import { useQueries } from '@tanstack/react-query';

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const cartItemIds = Object.keys(cart.items);
    const dispatch = useDispatch();

    const handleAddItem = useCallback((id) => dispatch(addItem({ id })), [dispatch]);
    const handleRemoveItem = useCallback((id) => dispatch(removeItem({ id })), [dispatch]);
    const handleCheckout = useCallback(() => dispatch(checkout()), [dispatch]);

    const productQueries = useQueries({
        queries: cartItemIds.map(id => ({
            queryKey: ['product', id],
            queryFn: () => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        }))
    });

    const getProductName = useCallback((id) => {
        const index = cartItemIds.findIndex(itemId => itemId === id);
        const productQuery = productQueries[index];
        if (productQuery.isLoading) return 'Loading...';
        if (productQuery.isError) return 'Error loading product';
        return productQuery?.data?.title || 'Unknown Product';
    }, [productQueries, cartItemIds]);

    const totalPrice = useMemo(() => {
        return cartItemIds.reduce((total, id) => {
            const index = cartItemIds.findIndex(itemId => itemId === id);
            const productQuery = productQueries[index];
            
            if (productQuery.isSuccess && productQuery.data) {
                const productPrice = productQuery.data.price;
                const quantity = cart.items[id];
                return total + (productPrice * quantity);
            }
            return total;
        }, 0);
    }, [cart.items, cartItemIds, productQueries]);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ListGroup>
                {Object.entries(cart.items).map(([id, quantity]) => (
                    <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                        <span>{getProductName(id)} - Quantity: {quantity}</span>
                        <div>
                            <Button variant="success" onClick={() => handleAddItem(id)}>+</Button>
                            <Button variant="danger" onClick={() => handleRemoveItem(id)}>-</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <p>Total Items: {cart.totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
            <Link to="/home">
                <Button variant="secondary" className="ms-2">Return to Home</Button>
            </Link>
        </div>
    );
};

export default ShoppingCart;


