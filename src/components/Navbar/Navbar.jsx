import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        Budget
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Paycheck
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;