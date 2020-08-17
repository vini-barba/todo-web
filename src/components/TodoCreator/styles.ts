import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  position: sticky;
  top: 0;
  z-index: 10;

  padding: 15px;
  border-radius: 0 0 5px 5px;
  margin-bottom: 20px;

  background: var(--secondary);
  @media (min-width: 1020px) {
    max-width: 500px;
  }
`;

export const Title = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 10px 0;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > textarea,
  input[type='datetime-local'] {
    background: var(--white);
    color: var(--secondary);

    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;

    font-size: 20px;
    line-height: 20px;
  }

  input[type='datetime-local'] {
    width: 50%;
    font-size: 15px;
    margin: 0;
  }
`;

export const Button = styled.button`
  background: var(--background);
  border: 1px solid var(--background);
  border-radius: 25px;

  color: var(--white);
  font-size: 17px;
  font-weight: 700;
  line-height: 40px;

  width: 40%;

  cursor: pointer;

  &:hover {
    background: var(--background-light-hover);
    transition: 0.2s;
  }
`;
