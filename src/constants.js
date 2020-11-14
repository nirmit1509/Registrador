import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css'

export const SuccessAlert = (msg) => { store.addNotification({
    title: 'Success',
    message: msg,
    type: 'success',                         // 'default', 'success', 'info', 'warning'
    container: 'top-right',                // where to position the notifications
    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
    dismiss: {
      duration: 1500
    }
  })
}

export const FailureAlert = (msg) => { store.addNotification({
  title: 'Alert',
  message: msg,
  type: 'danger',                         // 'default', 'success', 'info', 'warning'
  container: 'top-right',                // where to position the notifications
  animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
  animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
  dismiss: {
    duration: 1500
  }
})
}

export const headerCSS = {
    backgroundColor: '#ebf5fa',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '4px 15px',
    height: '70px'
}

export const cellCSS = {
    fontSize: '12px',
    padding: "6px 15px",
    height: '50px'
}

export const landStatusString = [
    'Not For Sale',
    'For Sale',
    'In Progress',
    'Sold'
]