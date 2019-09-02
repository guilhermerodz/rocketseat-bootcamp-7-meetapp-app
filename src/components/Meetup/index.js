import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import User from './User';
import {
  Container,
  Banner,
  Body,
  Title,
  Row,
  Info,
  PoweredBy,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function Meetup({
  banner,
  title,
  formattedDate,
  location,
  owner,
  past,
  handleSubscribe,
  handleUnsubscribe,
}) {
  return (
    <Container>
      <Banner
        source={{
          uri: banner && banner.url,
        }}
      />
      <Body>
        <Title>{title}</Title>
        <Row>
          <Icon name="event" color="#999" />
          <Info>{formattedDate}</Info>
        </Row>
        <Row>
          <Icon name="location-on" size={12} color="#999" />
          <Info>{location}</Info>
        </Row>
        <Row>
          <Icon name="person" size={12} color="#999" />
          <PoweredBy>
            <Info style={{ marginRight: 6 }}>Powered by</Info>
            <User user={owner} />
          </PoweredBy>
        </Row>

        {handleSubscribe && !past && (
          <SubscribeButton onPress={handleSubscribe}>Subscribe</SubscribeButton>
        )}

        {handleUnsubscribe && (
          <UnsubscribeButton onPress={handleUnsubscribe}>
            Unsubscribe
          </UnsubscribeButton>
        )}
      </Body>
    </Container>
  );
}
