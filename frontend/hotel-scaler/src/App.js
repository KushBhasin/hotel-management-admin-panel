
// importing all the components
import RoomBook from './components/RoomBook';
import AdminDelete from './components/AdminDelete';
import ViewData from './components/ViewData';

// importing styling
import './App.css';

// importing necessary functions for using react-router-dom for routing between the different pages in the single page app
import { BrowserRouter, Routes, Route } from "react-router-dom";

// the app component
function App() {

  // adding a function that is used for opening and closing the sidebar based on the screen size (i.e. making the website responsive and easy to view)
  const openClose = () => {
    if(document.querySelector('.sideBar').style.left == '0px')
    document.querySelector('.sideBar').style.left = '-100vw';
    else
    document.querySelector('.sideBar').style.left = '0';
  }


  return (
    <div className="App">

        {/* additional button for manually opening and closing the sidebar */}
        

        {/* the sidebar */}
        <div className='sideBar'>

          <span className='shade'></span>
          <h1>ADMIN</h1>

          {/* the dashboard goes to the main page of the app, showing the table of all current bookings */}
          <span>
            <i class="fa-solid fa-house"></i>
            <a href="/">DASHBOARD</a>
          </span>

          {/* the book new room option goes to the booking page, where the admin can enter a new booking */}
          <span>
            <i class="fa-solid fa-pen-to-square"></i>
            <a href="/booknewroom">BOOK NEW ROOM</a>
          </span>

          {/* the logout functionality is missing, as there is no use of a logout option in a single user app */}
          <span>
            <i class="fa-solid fa-right-from-bracket"></i>
            <a href="#">LOGOUT</a>
          </span>

        </div>

        {/* the main app  */}
        <div className='main_container'>
          <span id='heading'>
            <h3 id='welcome'>Welcome, </h3><h3>Admin</h3>
            <span id='oc' onClick={openClose}>
              <i class="fa-solid fa-bars"></i>
            </span>
          </span>

          {/* using the router here for showing different components based on which page the application is currently on */}
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewData />} />
                <Route path="/booknewroom" element={<RoomBook />} />
            </Routes>
          </BrowserRouter>
         
        </div>
        
        
    </div>
  );
}

export default App;
