import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminProduct from './pages/Admin/components/Product';
import ProductsTable from './pages/Admin/components/ProductsTable';
import ProductPurchasePage from './components/ProductPurchasePage';
import SalesTable from './pages/Admin/components/SalesTable';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import RegisterUsers from './pages/Admin/Register/Users';
import AdminPage from './pages/Admin';
import NotFound from './pages/NotFound';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={
              <App />
            } />
            <Route path='/404' element={<NotFound />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path="/product/:id" element={<ProductPurchasePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

