import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/app.router';
import TopBar from './containers/components/top_bar';

function App() {
  return (
    <div className="App">
       <Router>
          <TopBar />
          <AppRouter />
      </Router>
    </div>
  );
}

export default App;
