import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import configureStore from 'redux-mock-store';
import ProductCatalog from './ProductCatalog';
import fetchMock from 'jest-fetch-mock';

const queryClient = new QueryClient();
const mockStore = configureStore([]);
fetchMock.enableMocks();

describe('ProductCatalog', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: {},
                totalItems: 0,
            },
        });
        fetchMock.resetMocks();
    });

    it('displays loading spinner initially', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ProductCatalog />
                </QueryClientProvider>
            </Provider>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders products after fetching', async () => {
        const products = [
            {
                id: 1,
                title: 'Product 1',
                price: 29.99,
                image: 'https://via.placeholder.com/150',
            },
            {
                id: 2,
                title: 'Product 2',
                price: 39.99,
                image: 'https://via.placeholder.com/150',
            },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(products));

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ProductCatalog />
                </QueryClientProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });
    });

    it('shows error message when API call fails', async () => {
        fetchMock.mockReject(new Error('Failed to fetch products'));

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ProductCatalog />
                </QueryClientProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
        });
    });
});
