export default (filter, users) => {
  let array = [];
  filter.forEach(element => {
    users[element] && array.push(users[element]);
  });
  return array;
};
