const removeEmpty = (record) => record;

const parseRecords = (recordString) => {
  const date = recordString.match(/-[0-9]{2}-[0-9]{2}/g)[0].substring(1);
  const minute = parseInt(recordString.match(/[0-9]{2}:[0-9]{2}/g)[0].replace(':', '')[1]);
  const timestamp = new Date(recordString.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/g));
  const recordStatus = recordString.replace(/\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}\]/g, '').trim();

  return {
    date: date,
    guardId: recordStatus.match(/#[0-9]*/g) ? recordStatus.match(/#[0-9]*/g)[0].replace('#', '') : undefined,
    minute: timestamp.getMinutes() - 1,
    status: recordStatus,
    timestamp: timestamp
  };
};

const byDateAsc = (recordOne, recordTwo) =>
  recordOne.timestamp - recordTwo.timestamp;

const isGuardChange = (record) =>
  record.guardId;

const initializeHour = () =>
  new Array(59).fill(0, 0, 59);

module.exports = (input) => {
  let currentGuard = 0;

  const schedule = input.split('\r\n')
    .filter(removeEmpty)
    .map(parseRecords)
    .sort(byDateAsc)
    .reduce((schedule, record, index, records) => {
      if (isGuardChange(record)) {
        currentGuard = record.guardId;
      } else if (record.status.includes('asleep')) {
        const nextRecord = records[index + 1];
        const endMinute = nextRecord && nextRecord.minute;

        for (let i = record.minute; i < endMinute; i++) {
          if (schedule[currentGuard]) {
            schedule[currentGuard][i]++;
          } else {
            schedule[currentGuard] = initializeHour();
          }
        }
      }

      return schedule;
    }, {});

  let currentMax = 0;

  return Object.keys(schedule)
    .map((key) => {
      const sleepingMinuteTotal = schedule[key]
        .reduce((acc, curr) => {
          return acc += curr;
        }, 1);
      const sleepingMinuteMax = Math.max(...schedule[key]);
      const maxSleepingMinuteIndex = schedule[key].indexOf(sleepingMinuteMax) + 1;

      return {
        id: key,
        max: sleepingMinuteMax,
        maxIndex: maxSleepingMinuteIndex
      };
    })
    .reduce((acc, curr) => {
      if (curr.max > currentMax) {
        currentMax = curr.max;
        acc = curr.maxIndex * curr.id;
      }

      return acc;
    }, 0);
};
