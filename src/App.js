import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

// Pages
/// Auth
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
/// User
import Profile from './components/pages/User/Profile';
/// Pet
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

// Context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/pet/mypets" element={<MyPets />}></Route>
            <Route path="/pet/add" element={<AddPet />}></Route>
            <Route path="/pet/edit/:id" element={<EditPet />}></Route>
            <Route path="/pet/myadoptions" element={<MyAdoptions />}></Route>
            <Route path="/pet/:id" element={<PetDetails />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
