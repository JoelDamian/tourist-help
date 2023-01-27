import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { logoutUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { setUser } = props;
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        localStorage.removeItem("user");
        setUser();
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <MDBNavbar lg dark style={{ backgroundColor: "#5dc1b9", color: "white" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Administrador</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active onClick={() => handleLogOut()}>
                Cerrar Sesion
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
