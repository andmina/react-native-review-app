import { NavigationActions } from 'react-navigation';

let _navigator; // way to allow us to interact w navigation from outside of the scope of our actual componenets screens

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};