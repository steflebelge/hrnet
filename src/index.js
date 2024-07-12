import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Header from "./layout/Header/Header";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Error from "./pages/Error/Error";
import store from "./utils/store";
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<CreateEmployee/>}/>
                    <Route path="/EmployeeList" element={<EmployeeList/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);

