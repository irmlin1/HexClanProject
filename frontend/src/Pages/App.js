import '../Styles/App.css';
import NavigationBar from '../Components/NavigationBar';
import Footer from '../Components/Footer';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';

function App(props) {
<<<<<<< Updated upstream
		const { Page, AuthContext } = props;
=======
		const { Page } = props;
>>>>>>> Stashed changes

    const { isAuthenticated } = useContext(AuthContext);
		console.log(window.location.href);
    return !isAuthenticated ? (
			// wait until response comes back from the server
			// if user is authenticated, the dashboard will load
			<CircularProgress />
    ) : (
			<div className="App">
				<NavigationBar/>
				<Page/>
				<Footer/>
			</div>
    );
}

export default App;
