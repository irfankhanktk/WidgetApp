import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'navigation/navigation-ref';
import { RootNavigator } from 'navigation/root-navigation';
import 'config/axios-interceptor';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  LogBox,
  NativeModules,
  StyleSheet
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from 'store';
import { UTILS } from 'utils';
import { getWidgetData } from 'services/api/api-actions';

LogBox.ignoreAllLogs(true);

const API_KEY = '';
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const { RNSharedWidget } = NativeModules;

export const App: FC = () => {
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [loading, setLoading] = useState(false);
  const [focusItem, setFocusItem] = useState('');

  const [result, setResult] = useState('0');

  useEffect(() => {

    //Implementing the setInterval method
    const interval = setInterval(() => {
      getData();
    }, 60000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  const getData = async () => {
    getWidgetData().then(res => {
      RNSharedWidget.setData(
        'convertorMonex',
        JSON.stringify({
          from: res?.from,
          to: res?.to,
          amount: res?.amount,
          result: res?.result,
        }),
        (_status: number | null) => {
          // log callback in case of success/error
        }
      );
    }).catch((e) => {
      // Alert.alert('Widget Error', UTILS.returnError(e));
    })
  };

  const onSubmit = () => {

  };



  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  resultContainer: {
    padding: 30,
    height: 300,
    backgroundColor: '#996',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldsContainer: {
    marginVertical: 30,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    borderColor: 'grey',
    borderWidth: 1,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
