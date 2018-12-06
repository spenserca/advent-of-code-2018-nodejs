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

const setStateForMinute = (status) =>
  status === 'wakes up'
    ? '.'
    : '#';

const initialHour = () =>
  Array.apply('.', 60);

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
      if (!guard && record.guardId) {
        schedule.push({
          guardId: record.guardId
        });
      }
      // is a status change
      else {

      }



      return schedule;
    }, []);
};
