import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;

  margin-right: 10px;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;
