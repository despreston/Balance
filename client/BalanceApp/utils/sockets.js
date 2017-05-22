/* eslint no-console: "off" */
import actions from '../actions';
import io from 'socket.io-client';
import convertDates from './convert-dates';

const onNotification = store => data => {
  try {
    data = JSON.parse(data);
    data = convertDates(data);
    store.dispatch(actions.receiveNotifications(data));
    store.dispatch(actions.showNotificationToaster(data._id));
  } catch (e) {
    console.log("can't parse the notification: ", data);
  }
};

const onOpen = (socket, user) => {
  socket.emit('join_room', `user:${user}`);
};

export default store => next => action => {
  let socket = null;

  switch (action.type) {
    case 'CONNECT_TO_PIPER':
      socket = io(action.url, { transports: [ 'websocket' ] });
      socket.on('connect', onOpen.bind(this, socket, action.user));
      socket.on('notification', onNotification(store));
      break;

    default:
      return next(action);
  }
};