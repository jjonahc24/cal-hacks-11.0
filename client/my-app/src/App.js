import './App.css';
import Profile from './components/landing_page/profile'
import ProfileDropDown from './components/landing_page/profile_dropdown'



function App() {
  return (
    <div className="App">
      <div className="">
        <Profile /> 
        <ProfileDropDown />
      </div>
      
    </div>
  );
}


export default App;