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
  let solutionId = 0;

  const schedule = input.split('\r\n')
    .filter(removeEmpty)
    .map(parseRecords)
    .sort(byDateAsc)
    .reduce((schedule, record, index, records) => {
      console.log(JSON.stringify(record));

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

      // // is a guard record
      // if (!schedule.has(record.guardId) && isGuardChange(record)) {
      //   schedule.set(record.guardId, initializeHour());
      //   // schedule[record.guardId] = initializeHour();
      //   currentGuard.id = record.guardId;
      // }
      // // is a status change
      // else {
      //   // for the guard set an initialHour with awake values
      //   // increment the index each time he sleeps to get the 
      //   // minute that he is asleep the most
      //   if (record.status === 'falls asleep') {
      //     const nextRecord = records[index + 1];
      //     const existingGuard = schedule.get(currentGuard.id);
      //     for (let i = record.minute; i < nextRecord.minute; i++) {
      //       existingGuard[i]++;
      //     }
      //     schedule.set(currentGuard.id, existingGuard);
      //   }
      // }

      return schedule;
    }, {});

  let total = 0,
    max = 0,
    maxMinute,
    solutionGuard;

  Object.keys(schedule)
    .forEach((guardId) => {
      const currentTotal = schedule[guardId]
        .reduce((acc, curr) => {
          return acc += curr;
        }, 0);
      const currentMax = Math.max(...schedule[guardId]);

      if (currentTotal > total) {
        max = currentMax;
        maxMinute = schedule[guardId].indexOf(currentMax);
        solutionGuard = parseInt(guardId);
      }
    });

  return solutionGuard;
  // return maxMinute;
};
