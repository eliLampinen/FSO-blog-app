import { Link } from 'react-router-dom';
import '../App.css';


const Menu = () => {
  return (
    <div className="nav-menu">
      <Link to="/" className="nav-link">
        Main menu
      </Link>
      <Link to="/users" className="nav-link">
        users
      </Link>        
    </div>
  );
}

export default Menu;
