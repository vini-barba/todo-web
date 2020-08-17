import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 10px;

  @media (min-width: 700px) {
    width: 500px;
    margin: auto;
  }

  @media (min-width: 1020px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
`;

export const TodoListContainer = styled.div`
  width: 100%;
  @media (min-width: 1020px) {
    margin: 20px 15px;
    max-width: 600px;
  }
`;
