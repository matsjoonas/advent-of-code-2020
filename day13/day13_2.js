const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n');
  const buses = input[1].split(',').reduce((acc, cur, idx) => {
    if (cur !== 'x') {
      acc.push([parseInt(cur), idx])
    }
    return acc;
  }, []);

  /*
   * that's a tricky one
   * we can see from the example timetable (buses 7, 13, 59, 31, 19), that
   * the timestamp (t) we are looking for, must satisfy the following conditions:
   * t % 7 == 0
   * (t + 1) % 13 == 0
   * (t + 4) % 59 == 0
   * (t + 6) % 31 == 0
   * (t + 7) % 19 == 0
   *
   * how do we find such a timestamp?
   * we could just start iterating from 0 and checking if the current number satisfies all the above conditions,
   * but that would take a long time as we'd probably
   * need to iterate over more than 100000000000000 numbers
   * so, there must be a better way to do this
   *
   * for a pattern that consist of any number of intervals, the interval at which that whole pattern repeats
   * is the least common multiple (LMC) of these intervals.
   * if intervals a, b, c are prime numbers, then the interval after which their pattern repeats is a * b * c (LMC)
   * e.g.
   *       |   111
   * 123456|789012
   * __3__3|__3__3
   * _2_2_2|_2_2_2
   * we can see that for intervals of 3 and 2, the interval after which the whole pattern repeats is 6.
   *
   * considering all of the above, a better algorithm would be:
   * find the first timestamp where:
   * t % 7 == 0
   * (t + 1) % 13 == 0
   * to find such a timestamp,
   * we start iterating from 0 until we find a number (timestamp t) that satisfies both conditions (pattern)
   * remember that timestamp
   * find the interval after which our pattern repeats: 91 for 7 and 13 (LMC)
   * we now have the first timestamp and the interval by which our two-bus pattern repeats
   *
   * we now do pretty much the same thing as before but instead of 0, we start from the previous timestamp
   * (no need to consider earlier times, because the prev timestamp is the earliest point at which our pattern could be found)
   * and use 91 as our interval, as the whole pattern can't repeat more often than the interval (91) for the
   * first two-bus pattern
   * the interval for the next bus would be 91 * 51 and the starting point would be the timestamp we found here
   *
   * repeat for all the remaining buses
   *
   * Note: all the buses are prime numbers and LMC for prime numbers is just those prime numbers multiplied
   * e.g. LMC for 7; 13 and 59 is 5369
   * this is so because every prime number is only divisible by itself and 1
   */

  function findFirstMatchingTimestamp(startingPoint, bus) {
    let i = 0;
    let {timestamp, interval} = startingPoint;
    let newTimestamp;
    while (true) {
      if ((timestamp + (interval * i + bus[1])) % bus[0] === 0) {
        newTimestamp = interval * i + timestamp;
        break;
      }
      i++;
    }
    return {
      timestamp: newTimestamp,
      interval: interval * bus[0],
    };
  }

  const answer = buses.reduce((acc, bus) => {
    if (!acc) {
      acc = {
        timestamp: 0,
        interval: bus[0],
      }
    } else {
      acc = findFirstMatchingTimestamp(acc, bus);
    }
    return acc;

  }, null);


  return answer.timestamp;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [1068781, 3417, 754018, 779210, 1261476, 1202161486],
});

//suite.test();
suite.solve();
//suite.performance();
