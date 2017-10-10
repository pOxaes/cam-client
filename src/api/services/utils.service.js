import moment from 'moment';

const sortByDateDesc = key => (objA, objB) => {
  if (objA[key].isBefore(objB[key])) {
    return 1;
  }
  if (objB[key].isBefore(objA[key])) {
    return -1;
  }
  return 0;
};

const sortByDateAsc = key => (objA, objB) => {
  if (objA[key].isAfter(objB[key])) {
    return 1;
  }
  if (objB[key].isAfter(objA[key])) {
    return -1;
  }
  return 0;
};

const find = (items, foo) => {
  const item = items.filter(foo);
  return item.length ? item[0] : undefined;
};

// TODO: remove new Date, format server side
const fromJsDateToMoment = date => moment(new Date(date));

const values = obj => Object.keys(obj).map(key => obj[key]);

const getById = (items, id) => find(items, item => item._id === id);

const updateObj = (obj, data) => {
  Object.keys(data).forEach((key) => {
    obj[key] = data[key];
  });
};

const updateById = (items, id, data) => {
  const item = getById(items, id);
  if (!item) {
    return;
  }
  updateObj(item, data);
};

export default {
  find,
  fromJsDateToMoment,
  getById,
  sortByDateAsc,
  sortByDateDesc,
  updateById,
  updateObj,
  values,
};
