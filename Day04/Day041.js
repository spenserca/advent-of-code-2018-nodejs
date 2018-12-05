const byDateAsc = (recordOne, recordTwo) =>
  recordOne.timestamp - recordTwo.timestamp;

const parseRecords = (recordString) => {
  const timestamp = recordString.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/g);
  const recordStatus = recordString.replace(/\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}\]/g, '').trim();

  return {
    status: recordStatus,
    timestamp: new Date(timestamp)
  };
};

const removeEmpty = (record) => record;

module.exports = (input) => {
  return input.split('\r\n')
    .filter(removeEmpty)
    .map(parseRecords)
    .sort(byDateAsc);
};
