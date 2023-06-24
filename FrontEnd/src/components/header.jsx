import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import BurgerMenu from './BurguerMenu';


function Header() {
    const {auth} = useContext(AuthContext)
    return (
        <header style={{ backgroundColor: "rgb(194, 178, 128)", width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <Link to="/">
        <img src="/icono.png" alt="Logo" style={{ width: '60px', height: '60px'}} />
      </Link>
            <h1 style={{ fontSize: '30px', color: 'white' }}>TripTip</h1>
            {auth ? 
            <BurgerMenu /> : 
            <Link to="/login" style={{ color: 'white', marginLeft: 'auto', marginRight: '10px', textDecoration: 'none' }}>Iniciar sesión</Link>}
        </header>
    );
}

export default Header;
