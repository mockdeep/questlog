'use strict';

import moment from 'moment';

import TimeBalancer from '_helpers/time_balancer';

describe('TimeBalancer.baseBalances', function () {
  it('returns a collection of base time pairs', function () {
    const expectedPairs = [
      [moment([2014, 0, 1, 10]), {today: 1, week: 3, month: 27, quarter: 59, year: 275}],
      [moment([2014, 0, 2, 10]), {today: 1, week: 2, month: 27, quarter: 59, year: 275}],
      [moment([2014, 0, 24, 10]), {today: 1, week: 1, month: 6, quarter: 59, year: 275}],
      [moment([2014, 0, 25, 10]), {today: 1, week: 0, month: 6, quarter: 59, year: 275}],
      [moment([2014, 0, 26, 10]), {today: 1, week: 6, month: 0, quarter: 58, year: 275}],
      [moment([2014, 0, 30, 10]), {today: 1, week: 2, month: 0, quarter: 58, year: 275}],
      [moment([2014, 0, 31, 10]), {today: 1, week: 1, month: 0, quarter: 58, year: 275}],
      [moment([2014, 1, 1, 10]), {today: 1, week: 0, month: 27, quarter: 31, year: 275}],
      [moment([2014, 1, 2, 10]), {today: 1, week: 6, month: 20, quarter: 31, year: 275}],
      [moment([2014, 2, 1, 10]), {today: 1, week: 0, month: 30, quarter: 0, year: 275}],
      [moment([2014, 2, 2, 10]), {today: 1, week: 6, month: 23, quarter: 0, year: 275}],
      [moment([2014, 3, 1, 10]), {today: 1, week: 4, month: 25, quarter: 61, year: 184}],
      [moment([2014, 6, 1, 10]), {today: 1, week: 4, month: 26, quarter: 61, year: 92}],
      [moment([2014, 9, 1, 10]), {today: 1, week: 3, month: 27, quarter: 61, year: 0}],
      [moment([2014, 11, 1, 10]), {today: 1, week: 5, month: 25, quarter: 0, year: 0}],
      [moment([2014, 11, 25, 10]), {today: 1, week: 2, month: 4, quarter: 0, year: 0}],
      [moment([2014, 11, 28, 10]), {today: 1, week: 6, month: 0, quarter: 0, year: 0}],
      [moment([2014, 11, 31, 10]), {today: 1, week: 3, month: 0, quarter: 0, year: 0}]
    ];

    expectedPairs.forEach(function (pair) {
      expect(TimeBalancer.baseBalances(pair[0])).to.eql(pair[1]);
    });
  });
});
