import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignUp,
          SignIn,
        }),
        App: createBottomTabNavigator({
          Dashboard,
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
