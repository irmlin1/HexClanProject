import '../Styles/App.css';
import Dashboard from '../Components/Dashboard';
import NavigationBar from '../Components/NavigationBar';
import Footer from '../Components/Footer';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;
