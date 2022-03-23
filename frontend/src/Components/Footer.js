import styled from "styled-components";

const Footer = () => {
  return <FooterDiv>
    <span>Made by random university students</span>
    <span>Also, hi!</span>
  </FooterDiv>;
}

export default Footer;

const FooterDiv = styled.div`
  color: var(--white-1);
  height: 100px;
  width: 100%;
  margin-top: auto;
  background-color: var(--black-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;