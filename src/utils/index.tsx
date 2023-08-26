import {
  Linking,
  Share
} from 'react-native';

// Initialize the module (needs to be done only once)
const getErrorList = (data: any) => {
  const { message, errors } = data;
  let concatenatedMessages: any = null;
  console.log('errors=>>::', errors);

  if (typeof errors === 'object' && Object.keys(errors)?.length) {
    const list: any = Object.values(message);
    concatenatedMessages = errors
      ? list?.flat()?.join(", ")
      : null;
  } else if (typeof message === 'string') return message;
  concatenatedMessages = message
    ? Object.values(message)?.flat()?.join(", ")
    : null;

  return concatenatedMessages;
}
export const horizontalAnimation: any = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};


export const UTILS = {
  dialPhone: async (phoneNumber: string) => {
    try {
      const isSupported = await Linking.canOpenURL(`tel:${phoneNumber}`);
      console.log('isSupported=>', isSupported);
      if (isSupported) Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      console.log('error =>', error);
    }
  },
  getFormData: (object: any) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  returnError: (error: any) => {
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log("FACTORY ERRORS :: ", JSON.parse(_response));
      const temp = JSON.parse(_response);
      const resp = getErrorList(temp);
      console.log('ASDFGFDSDF:::', resp);
      return `${resp}`
    }
    else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('=>>>>>>::::', error.response.data?.errors);
      console.log(error.response.status);
      // console.log(error.response.headers);
      console.log('error data ==>', error?.response.data);
      if (error.response.data?.errors) {
        return `${error?.response?.data?.errors}`;
      }
      return `${error?.response?.data?.message || error?.response?.status}`;
    } else if (error?.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error?.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    console.log('type of code: ', error?.code);
    console.log('type of message: ', error?.message);
    if (typeof error === 'string') {
      return `${error}`;
    }
    return `${error?.message || error?.code}`;
  },
  capitalizeFirst: (str: string) =>
    str?.charAt(0)?.toUpperCase() + str?.slice(1),
  returnStringify: (data: object) => JSON.stringify(data),
  _share: async (description = '', url: string) => {
    try {
      const result = await Share.share({

        message: description,
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  },



  serialize: (obj: any) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
  _removeEmptyKeys: (payload: any) => {
    const obj = payload;
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  },
};
