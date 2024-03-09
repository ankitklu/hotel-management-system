// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import CoverPage from './components/CoverPage';
import ViewHotel from './components/ViewHotel';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import About from './components/About';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminPage from './components/AdminPage';
import Profile from './components/Profile';
import Entry from './components/Entry';
import View from './components/View';
import Client from './components/Client';
import Deluxe from './components/rooms/Deluxe';
import NonDeluxe from './components/rooms/NonDeluxe';
import FarmHouse from './components/rooms/FarmHouse';
import Resorts from './components/rooms/Resorts';
import Book from './components/rooms/Book';
// import Book2 from './components/rooms/Book2';

function App() {
  return (
		<>
		<NavBar/>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<><CoverPage/><ViewHotel/><Footer/></>}></Route>
				<Route path="/about" element={<About/>}></Route>
				<Route path="/signup" element={<SignUp/>}></Route>
				<Route path='/view' element={<ViewHotel/>}></Route>
				<Route path='/signin' element={<Login/>}></Route>
				<Route path='/admin' element={<AdminPage/>}>
					<Route path='/admin/entry' element={<Entry/>}></Route>
					<Route path='/admin/profile' element={<Profile/>}></Route>
					<Route path='/admin/viewhotel' element={<View/>}></Route>
				</Route>
				<Route path='/client' element={<Client/>}>
					<Route path='/client/deluxe' element={<Deluxe/>}></Route>
					<Route path='/client/nondeluxe' element={<NonDeluxe/>}></Route>
					<Route path='/client/farm' element={<FarmHouse/>}></Route>
					<Route path='/client/resorts' element={<Resorts/>}></Route>
				</Route>
				<Route path='/book' element={<Book/>}></Route>
				
			</Routes>
		</BrowserRouter>
	  </>
  );
}

export default App;