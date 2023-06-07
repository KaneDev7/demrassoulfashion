import { NavLink } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../util';

const Item_filter = ({filtreValue, page }) => {
  
    return (
        <NavLink to={`${page}/${filtreValue}`} className={({ isActive }) => isActive ? 'item itemActif' : 'item'}> 
         {capitalizeFirstLetter(filtreValue)}
        </NavLink>
    );
};

export default Item_filter;