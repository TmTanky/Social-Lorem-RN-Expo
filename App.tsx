import React from 'react';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { BackHandler, Alert } from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import NetInfo from '@react-native-community/netinfo';

// Main Navigator
// import { MainNavigator } from './navigation';
import { MainNavigator2 } from './navigation2';

// Store
import { persistor, store } from './redux';

const App = () => {

  const [loaded] = useFonts({
    opsLight: require('./assets/fonts/OpenSans-Light.ttf'),
    opsReg: require('./assets/fonts/OpenSans-Regular.ttf'),
    opsSemi: require('./assets/fonts/OpenSans-SemiBold.ttf'),
    opsBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    opsBolder: require('./assets/fonts/OpenSans-ExtraBold.ttf')
  })

  if (!loaded) {
    return <AppLoading/>
  }

  NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      return Alert.alert('Connection Required', 'You need internet connection to continue', [
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
        }
      ])
    }
  })

  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <AppearanceProvider>
          <NavigationContainer>
            <MainNavigator2/>
          </NavigationContainer>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  )

}

export default App
