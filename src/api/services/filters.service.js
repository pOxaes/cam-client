import utils from './utils.service';

const FILTERS_SETTINGS = {
  camera: {
    key: 'camera',
    label: 'Cameras',
    valueKey: '_id',
    getLabel: item => item.name,
    getValue: item => item._id,
    type: 'list',
    filter: (cameraFilter, session) => session.camera._id === cameraFilter.value,
  },
};

const extractValue = (item, settings) => ({
  label: settings.getLabel(item),
  value: settings.getValue(item),
});

const extractFilter = (list, settings) => list.reduce((acc, item) => {
  const itemKeyValue = item[settings.key];
  const key = settings.valueKey ? itemKeyValue[settings.valueKey] : itemKeyValue;
  if (!acc.values[key]) {
    acc.values[key] = extractValue(itemKeyValue, settings);
  }
  return acc;
}, {
  label: settings.label,
  type: settings.type,
  key: settings.key,
  values: {},
});

const toLists = filters => utils.values(filters)
  .map((filter) => {
    filter.values = utils.values(filter.values);
    return filter;
  });

const compute = (movementSessions) => {
  const filters = Object.keys(FILTERS_SETTINGS).reduce((acc, settingsKey) => {
    const settings = FILTERS_SETTINGS[settingsKey];
    acc[settings.key] = extractFilter(movementSessions, settings);
    return acc;
  }, {});
  return toLists(filters);
};

const cleanActiveFilters = activeFilters => Object.keys(activeFilters).reduce((acc, filterKey) => {
  if (activeFilters[filterKey] !== '' && typeof activeFilters[filterKey] !== 'undefined') {
    acc[filterKey] = activeFilters[filterKey];
  }
  return acc;
}, {});

const filter = (movementSessions, filters) => {
  const cleanedFilters = cleanActiveFilters(filters);
  if (!Object.keys(cleanedFilters).length) {
    return movementSessions;
  }
  return movementSessions.filter(movementSession => Object.keys(cleanedFilters)
    .every(filterKey => FILTERS_SETTINGS[filterKey]
      .filter(cleanedFilters[filterKey], movementSession)));
};

export default {
  compute,
  filter,
};
