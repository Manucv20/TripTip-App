import './App.css'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;

  
  