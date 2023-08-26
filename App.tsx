import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'navigation/navigation-ref';
import { RootNavigator } from 'navigation/root-navigation';
import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  LogBox,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from 'store';

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
    if (result === '0') {
      // getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const getData = async () => {
    setLoading(true);
    try {
      let response;
      const request = await fetch(
        BASE_URL + `/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          method: 'GET',
          headers: {
            apiKey: API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      if (request.status === 200) {
        response = await request.json();
      }
      if (response && response.result) {
        setResult((response.result as any).toFixed(2));
        setLoading(false);
        RNSharedWidget.setData(
          'convertorMonex',
          JSON.stringify({
            from,
            to,
            amount: Number(amount),
            result: response.result.toFixed(2),
          }),
          (_status: number | null) => {
            // log callback in case of success/error
          }
        );
      }
    } catch (e) {
      setLoading(false);
      setResult(`error:  ${JSON.stringify(e)}`);
    }
  };

  const onSubmit = () => {
    RNSharedWidget.setData(
      'convertorMonex',
      JSON.stringify({
        from: 'US',
        to: 'PKR',
        amount: 33.33,
        result: 203.4,
      }),
      (_status: number | null) => {
        // log callback in case of success/error
      }
    );
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
