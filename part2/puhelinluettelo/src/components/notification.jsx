const Notifacation = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  return <div className={`error error-${messageType}`}>{message}</div>;
};

export default Notifacation;
