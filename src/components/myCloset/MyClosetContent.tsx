import styled from "styled-components";
import SquarePost from "../common/SquarePost";

const MyClosetContent = () => {
  return (
    <GridContainer>
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
    </GridContainer>
  );
};

export default MyClosetContent;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  row-gap: 15px;
  column-gap: 22px;
`;
