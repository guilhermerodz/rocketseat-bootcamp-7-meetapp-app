import styled from 'styled-components/native';

export const Container = styled.SafeAreaView.attrs({
  elevation: 2,
})`
  background: rgba(0, 0, 0, 0.12);
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 30px;
  height: 31px;
  margin-bottom: 15px;
`;
