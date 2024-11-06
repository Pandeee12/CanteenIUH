import Toast from 'react-native-toast-message';

export const showToast = (message) => {
  Toast.show({
    text1: message.title,
    text2: message.body,
    position: 'bottom',
    visibilityTime: 2000,
    autoHide: true,
  });
};
