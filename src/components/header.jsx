import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ backgroundColor: 'gray', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <img src="/icono.png" alt="Logo" style={{ width: '60px', height: '60px', margin: '10px' }} />
      <h1 style={{ fontSize: '30px', color: 'white' }}>TripTip</h1>
      <Link to="/login" style={{ color: 'white', marginLeft: 'auto', marginRight: '10px', textDecoration: 'none' }}>Acceder</Link>
    </header>
  );
}

export default Header;