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
import UserRestaurants from './Components/UserRestaurantList';
import UserRestaurantMenu from './Components/UserRestaurantMenu';
import Menu from './Components/RestaurantMenu';
import AuthProvider from './Components/AuthContext';
import UserProtected from './routes/UserProtected';
import AdminProtected from './routes/AdminProtected';
import Profile from './Components/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
                <Route element={<AdminProtected />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/restaurants' element={<Restaurants />} />
                  <Route path='/orders' element={<Order />} />
                  <Route path='/:id/menu' element={<Menu />} />
                </Route>
                <Route element={<UserProtected />}>
                  <Route path='/user/restaurants' element={<UserRestaurants />} />
                  <Route path='/user/restaurants/:id/menu' element={<UserRestaurantMenu />} />
                  <Route path='/user/profile' element={<Profile />} />
                </Route>
                <Route path='*' element={<Login />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
