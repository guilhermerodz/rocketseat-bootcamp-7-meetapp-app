import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  margin-top: 30px;
  flex: 1;
`;

export const Empty = styled.View`
  margin-bottom: 30px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})``;
