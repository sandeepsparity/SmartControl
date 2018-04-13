import { Toast } from 'native-base';
export const ToastMessage = (Toast, message) => {
  Toast.show({
    text: message,
    position: 'bottom',
    buttonText: 'Okay'
  })
}
export const ErrorToast = (text, buttonText = 'OK', type = 'danger', duration = 5000) => {
  Toast.show({
    text,
    buttonText,
    type,
    duration
  })
}
