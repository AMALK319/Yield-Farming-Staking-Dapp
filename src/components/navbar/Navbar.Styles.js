import styled from "styled-components";
/* import { Link } from "react-router-dom"; */


export const NavbarContainer = styled.nav`
  width: 100%;
 
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  display: flex;
  flex-direction: column;
  @media (min-width: 767px) {
    height: 80px;
  }
`;

export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
font-family: 'DM Sans';
font-style: normal;
font-weight: 700;
font-size: 36px;
margin-left: 0%;
/* identical to box height */

letter-spacing: 0.02em;

background: linear-gradient(91.06deg, #C6A5FF 2.26%, #71AFFF 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
`;

export const Logo = styled.img`
  
  margin-left: 40%;
  height: 80px;
`;

export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  padding-right: 200px;
  padding-top: 9px;

`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding-top: 3%;
  
`;

export const ButtonAddress = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 1% 3%;

position: relative;
width: 30%;
height: 30px;


background: linear-gradient(180deg, rgba(163, 207, 244, 0.83) 0%, rgba(172, 147, 228, 0.83) 100%);
border-radius: 10px;
border: none;

font-family: 'DM Sans';
font-style: normal;
font-weight: 400;
font-size: 18px;

color: #FFFFFF;

cursor: unset;

&:focus, &:click{
border: none;
}
`;


export const Span = styled.span`
display: inline;

font-family: 'DM Sans';

font-weight: bold;
font-size: 24px;

color: #FFFFFF;


`;
export const NavTest = styled.div`

`;


