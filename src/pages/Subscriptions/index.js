import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import us from 'date-fns/locale/en-US';

import api from '~/services/api';
import { getError } from '~/util/errorHandler';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import { Container, List, Empty, EmptyText } from './styles';

export default function Subscriptions() {
  const [loading, setLoading] = useState(true);

  const [meetups, setMeetups] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('subscriptions');

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          formattedDate: format(parseISO(meetup.date), 'H:mm aa', {
            locale: us,
          }),
        }))
      );
      setLoading(false);
      setRefreshing(false);
    }

    loadMeetups();
  }, [refreshCount]);

  async function handleRefresh() {
    setRefreshing(true);
    setMeetups([]);
    setRefreshCount(refreshCount + 1);
  }

  async function handleUnsubscribe(id) {
    try {
      const response = await api.delete(`subscriptions/${id}`);

      showMessage({
        type: 'info',
        message: `You have been unsubscribed from ${response.data.title}!`,
      });

      setMeetups(meetups.filter(meetup => meetup.id !== id));
    } catch (err) {
      showMessage({
        type: 'danger',
        message:
          getError(err) || 'Something is wrong... Sorry, try again later.',
      });
    }
  }

  return (
    <Background>
      <Header />

      <Container>
        {loading && <Loading />}

        {meetups.length ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                banner={item.banner}
                title={item.title}
                formattedDate={item.formattedDate}
                location={item.location}
                owner={item.owner}
                past={item.past}
                handleUnsubscribe={() => handleUnsubscribe(item.id)}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        ) : (
          <Empty>
            <Icon
              name="event-busy"
              size={50}
              color="rgba(255, 255, 255, 0.1)"
            />
            <EmptyText>You are not subscribed into any meetups yet.</EmptyText>
          </Empty>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
