import React, { useState, useEffect, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  parseISO,
  format,
  subDays,
  addDays,
  isBefore,
  startOfDay,
} from 'date-fns';
import us from 'date-fns/locale/en-US';

import api from '~/services/api';
import { getError } from '~/util/errorHandler';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import {
  Container,
  DateSelect,
  DateButton,
  DateText,
  List,
  Empty,
  EmptyText,
} from './styles';

function Dashboard({ isFocused }) {
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const allowBackward = useMemo(
    () => isBefore(startOfDay(new Date()), subDays(date, 1)),
    [date]
  );

  useEffect(() => {
    setMeetups([]);
    setPage(1);
  }, [date, isFocused]);

  useEffect(() => {
    if (!isFocused) return;

    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('available', {
        params: { date, page },
      });

      setMeetups(oldMeetups =>
        oldMeetups.concat(
          response.data
            .filter(meetup => !meetup.subscribed)
            .map(meetup => ({
              ...meetup,
              formattedDate: format(parseISO(meetup.date), 'H:mm aa', {
                locale: us,
              }),
            }))
        )
      );
      setHasMore(response.data.length > 0);
      setLoading(false);
      setRefreshing(false);
    }

    loadMeetups();
  }, [date, page, refreshCount, isFocused]);

  async function handleRefresh() {
    setRefreshing(true);
    setMeetups([]);
    setRefreshCount(refreshCount + 1);
  }

  async function handleSubscribe(id) {
    try {
      const response = await api.post(`subscriptions/${id}`);

      showMessage({
        type: 'success',
        message: `Congratulations! Subscribed into ${response.data.title}!`,
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
        <DateSelect>
          <DateButton
            onPress={() => allowBackward && setDate(subDays(date, 1))}
          >
            <Icon
              style={{ opacity: allowBackward ? 1 : 0.3 }}
              name="chevron-left"
              size={25}
              color="#F94D6A"
            />
          </DateButton>
          <DateText>{format(date, 'MM/dd/yy')}</DateText>
          <DateButton onPress={() => setDate(addDays(date, 1))} allow>
            <Icon name="chevron-right" size={25} color="#F94D6A" />
          </DateButton>
        </DateSelect>

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
                handleSubscribe={() => handleSubscribe(item.id)}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            onEndReached={() => hasMore && setPage(page + 1)}
            onEndReachedThreshold={0.2}
          />
        ) : (
          <Empty>
            <Icon
              name="event-busy"
              size={50}
              color="rgba(255, 255, 255, 0.1)"
            />
            <EmptyText>There are no meetups for this date yet.</EmptyText>
          </Empty>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
