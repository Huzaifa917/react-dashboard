import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const bounceAnimation = keyframes`
  /* Animation code here... */
`;

const colorChangeAnimation = keyframes`
  /* Animation code here... */
`;

const FrontPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

// Styled component for the background
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: #002641; /* Same background color as the login screen */
`;

const HomeText = styled.h2`
  position: absolute;
  top: 20px; /* Adjust the top position as needed */
  left: 20px; /* Adjust the left position as needed */
  font-size: 24px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 5px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff; /* Change title text color to white */
`;

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none; /* Remove the default button border */
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  animation: ${bounceAnimation} 1s infinite;
  text-decoration: none; /* Remove the underline from the link element */
`;

const ArrowIcon = styled.span`
  margin-left: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Remove the underline from the link element */
`;

const FrontPage = () => {
  return (
    <FrontPageContainer>
      <Background /> {/* Use the background component */}
      <HomeText>
        {" "}
        <Link to="/" style={{ color: "#fff" }}>
          Home
        </Link>
      </HomeText>
      <Title>
        D.I.C.E.D.I.I Dashboard for Increasing Collection Efficiency of Desludging in Islamabad
      </Title>
      <StyledLink to="/login">
        <NextButton>
          Next <ArrowIcon>→</ArrowIcon>
        </NextButton>
      </StyledLink>
    </FrontPageContainer>
  );
};

export default FrontPage;
