import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Homepage from './Components/Homepage';
import UserContext from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCart from './Components/ShoppingCart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddProduct from './Components/AddProduct';
import NavigationBar from './Components/NavigationBar';
import SearchResults from './Components/SearchResults';
import Logout from './Components/Logout';
import './Components/i18n';
import LanguageSwitcher from './Components/LanguageSwitcher';
const queryClient = new QueryClient();



function App() {
    const [user, setUser] = useState({ name: '', isLoggedIn: false})

    return (
        <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
              <NavigationBar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path='/search' element={<SearchResults />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Router>
            <LanguageSwitcher />
        </UserContext.Provider>
        </QueryClientProvider>
    );
};

export default App;