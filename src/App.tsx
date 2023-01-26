import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-data-grid/lib/styles.css';
import './App.css';
import UserTable from './modules/UserTable';
import AccessTable from './modules/AccesTable';
import IsTable from './modules/IsTable';
import ResourceTable from './modules/ResourceTable';
import RoleTable from './modules/RoleTable';

function App() {
  return (
    <div className='App'>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/access' className='navbar-brand'>
          RosAtom
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={"/access"} className="nav-link">
              Доступ
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={"/users"} className="nav-link">Пользователи</Link>
          </li>
          <li className='nav-item'>
            <Link to={"/is"} className="nav-link">ИС</Link>
          </li>
          <li className='nav-item'>
            <Link to={"/resource"} className="nav-link">Ресурсы</Link>
          </li>
          <li className='nav-item'>
            <Link to={"/role"} className="nav-link">Роли</Link>
          </li>
          {/* <li className='nav-item'>
            <Link to={"/System"} className="nav-link">System</Link>
          </li>
          <li className='nav-item'>
            <Link to={"/role"} className="nav-link">Role</Link>
          </li> */}
        </div>
      </nav>

      <main className='mainClassname'>
        <Routes>
          <Route path='/access' element={<AccessTable/>}/>
          <Route path='/users' element={<UserTable/>}/>
          <Route path='/is' element={<IsTable/>}/>
          <Route path='/resource' element={<ResourceTable/>}/>
          <Route path='/role' element={<RoleTable/>}/>
        </Routes>
      </main>
    </div>
  )
}
export default App;
