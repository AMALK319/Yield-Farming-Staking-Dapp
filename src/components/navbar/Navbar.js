import React, { useState as UseState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  LogoText,
  Logo,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  ButtonAddress,
  Span,
  /*  NavbarLinkContainer,
   NavbarLink, */

} from "./Navbar.Styles";

import LogoImg from '../../assets/logo.PNG';
/* import './navbar.scss'; */

function Navbar(props) {

  const handleAddressViewing = (address) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 7, address.length - 1);
 }

  return (
    <NavbarContainer >
      <NavbarInnerContainer>
        <LeftContainer>
          <Logo src={LogoImg}></Logo>
          <LogoText>EtherFarm</LogoText>

        </LeftContainer>
        <RightContainer>
          
          <span className="text-bold">Connected To</span><ButtonAddress>{handleAddressViewing(`${props.address}`)}</ButtonAddress>
        </RightContainer>
      </NavbarInnerContainer>

    </NavbarContainer>
  );
}

export default Navbar;