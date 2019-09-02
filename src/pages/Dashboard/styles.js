import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin-top: 30px;
  flex: 1;
`;

export const DateSelect = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DateButton = styled(TouchableOpacity)``;

export const DateText = styled.Text`
  margin: 0 15px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
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
  showsVerticalScrollIndicator: false,
})``;
