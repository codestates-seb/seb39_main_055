import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start-end;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 1px;
  gap: 20px;
  padding: 50px 10px;
  // font-family: ONE Mobile;
  font-weight: 400;
  font-size: 50px;
  color: #161616;
`;

const SideText = () => {
  return (
    <Container>
      <div>행복한</div>
      <div>반려생활을 위해</div>
      <div>공유하는</div>
      <div>윗펫 Pick!</div>
    </Container>
  );
};

export default SideText;
