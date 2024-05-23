import React from 'react';
import Dashboard from './Components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/CSS/styles.css';

// const App = () => {
//   return (
//     <Router>
//       <div id="wrapper">
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Routes>
//               <Route exact path="/" element={<Dashboard />} />
//               <Route path="/users" element={() => <div>Users</div>} />
//               <Route path="/settings" element={() => <div>Settings</div>} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;



import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Order from './Components/Order';
import Restaurants from './Components/ReastaurantList';
import Menu from './Components/RestaurantMenu';

function App() {
  return (
    <BrowserRouter>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/restaurants' element={<Restaurants />} />
              <Route path='/:id/menu' element={<Menu />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
