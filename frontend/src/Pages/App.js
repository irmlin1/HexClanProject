import '../Styles/App.css';
import Dashboard from '../Components/Dashboard';
import NavigationBar from '../Components/NavigationBar';
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {CircularProgress} from "@mui/material";
import Footer from "../Components/Footer";

function App() {

    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? (
        // wait until response comes back from the server
        // if user is authenticated, the dashboard will load
        <CircularProgress />
    ) : (
        <div className="App">
          <NavigationBar/>
          <Dashboard/>
          <Footer/>
        </div>
        );
}

export default App;
