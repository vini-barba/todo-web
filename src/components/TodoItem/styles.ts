import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: var(--white);

  padding: 10px 0px 10px 10px;
  margin-bottom: 15px;
  width: 100%;

  border: 1px solid var(--background);
  border-radius: 8px;
  @media (min-width: 1020px) {
    max-width: 600px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  flex-grow: 1;

  span {
    color: var(--secondary);
  }
  strong {
    margin-left: 5px;
    color: var(--secondary);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px;
`;

export const DeleteIcon = styled.span`
  color: var(--delete);
`;

export const CheckIcon = styled.span``;

export const Textarea = styled.textarea`
  color: var(--search);

  font-size: 15px;
  line-height: 20px;

  width: 100%;
  min-height: 60px;

  margin-right: 15px;
  margin-bottom: 10px;
  padding: 5px;

  border: 1px solid var(--background);
  border-radius: 5px;

  resize: vertical;
`;
