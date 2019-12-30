import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../Redux/Actions/AuthActions";


const NavComponent = () => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const logout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        console.log("Logout")
    };


    return <div>
        <Navbar light className='navbar-color' expand="md">
            <NavbarBrand className="custom-font-dancing" href="#/list">Reqres App</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="active" href="#/actions">Actions</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/" onClick={logout}>Cerrar Sesion</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
};

export default NavComponent;