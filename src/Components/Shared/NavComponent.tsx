import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown
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
            <NavbarBrand href="#/list">Reqres App</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="active" href="#/user_actions">User Actions</NavLink>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Resources
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="#/resource_actions">
                                {/*<a className="dropdown-item" href="#/resource_actions">Resource actions</a>*/}
                                Resource actions
                                {/*<NavLink className="active" href="#/resource_actions">Resource actions</NavLink>*/}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="#/statistics">Statistics resource
                                {/*<a className="dropdown-item" href="#/statistics">Statistics</a>*/}
                                {/*<NavLink className="active" href="#/statistics">Statistics</NavLink>*/}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink href="#/" onClick={logout}>Cerrar Sesion</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
};

export default NavComponent;