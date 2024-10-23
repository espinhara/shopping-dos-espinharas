import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminProduct from './components/Admin/Product';
import ProductsTable from './components/Admin/ProductsTable';

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
            }/>
            <Route path='/admin/product' element={<AdminProduct/>} />
            <Route path='/admin/products' element={<ProductsTable/>} />
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

