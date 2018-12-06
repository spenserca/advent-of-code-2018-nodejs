const removeEmpty = (record) => record;

const parseRecords = (recordString) => {
  const date = recordString.match(/[0-9]{2}-[0-9]{2}/g)[0];
  const minute = parseInt(recordString.match(/[0-9]{2}:[0-9]{2}/g)[0].replace(':', '')[1]);
  const timestamp = recordString.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/g);
  const recordStatus = recordString.replace(/\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}\]/g, '').trim();

  return {
    date: date,
    guardId: recordStatus.match(/#[0-9]*/g) ? parseInt(recordStatus.match(/#[0-9]*/g)[0].replace('#', '')) : undefined,
    minute: minute,
    status: recordStatus,
    timestamp: new Date(timestamp)
  };
};

const byDateAsc = (recordOne, recordTwo) =>
  recordOne.timestamp - recordTwo.timestamp;

const isGuardChange = (record) =>
  record.guardId;

const setStateForMinute = (status) =>
  status === 'wakes up'
    ? 0
    : 1;

const initializeHour = () =>
  new Array(60).fill(0, 0, 60);

module.exports = (input) => {
  let schedule = [];
  let currentGuardId = 0;

  return input.split('\r\n')
    .filter(removeEmpty)
    .map(parseRecords)
    .sort(byDateAsc)
    .reduce((schedule, record) => {
      const guard = schedule.find((s) => s.guardId === record.guardId);

      // is a guard record
      if (!guard && isGuardChange(record)) {
        schedule.push({
          miuntes: initializeHour(),
          guardId: record.guardId
        });
      }
      // is a status change
      else {
        // for the guard set an initialHour with awake values
        // increment the index each time he sleeps to get the 
        // minute that he is asleep the most

      }

      return schedule;
    }, []);
};
