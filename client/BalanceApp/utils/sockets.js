import actions from '../actions';
import io from 'socket.io-client';

const onNotification = store => data => {
  store.dispatch(actions.receiveNotifications(data));
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