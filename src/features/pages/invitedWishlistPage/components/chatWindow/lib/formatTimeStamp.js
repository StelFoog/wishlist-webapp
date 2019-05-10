const formatTimestamp = timestamp => {
  let time = new Date(0);
  time.setUTCSeconds(timestamp.seconds);
  return (
    time.getHours() +
    ":" +
    time.getMinutes() +
    ", " +
    time.getFullYear() +
    "/" +
    (time.getMonth() + 1) +
    "/" +
    time.getDate()
  );
};

export default formatTimestamp;
