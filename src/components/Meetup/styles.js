import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View.attrs({
  elevation: 2,
})`
  background: #fff;
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  overflow: hidden;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 140px;
  align-content: stretch;
`;

export const Body = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #444;
`;

export const Row = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.Text`
  flex-direction: row;
  align-items: center;

  margin-left: 6px;
  font-size: 14px;
  color: #888;
`;

export const PoweredBy = styled.View`
  flex: 1;
  flex-direction: row;

  align-items: center;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 10px;
  background: #f94d6a;
`;

export const UnsubscribeButton = styled(Button)`
  margin-top: 10px;
  background: #333;
`;
