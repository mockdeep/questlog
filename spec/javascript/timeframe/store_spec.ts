jest.mock('src/_helpers/request');

import request from 'src/_helpers/request';
import TimeframeStore from 'src/timeframe/store';

import {makeTask} from '_test_helpers/factories';

describe('subscribe', () => {
  it('subscribes a listener', () => {
    const listener = jest.fn();

    TimeframeStore.subscribe(listener);

    TimeframeStore.notifyListeners();
    expect(listener).toHaveBeenCalled();

    TimeframeStore.unsubscribe(listener);
  });
});

describe('unsubscribe', () => {
  it('unsubscribes a listener', () => {
    const listener = jest.fn();
    TimeframeStore.subscribe(listener);

    TimeframeStore.unsubscribe(listener);

    TimeframeStore.notifyListeners();
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('notifyListeners', () => {
  it('notifies all listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    TimeframeStore.subscribe(listener1);
    TimeframeStore.subscribe(listener2);

    TimeframeStore.notifyListeners();

    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();

    TimeframeStore.unsubscribe(listener1);
    TimeframeStore.unsubscribe(listener2);
  });

  it('does not raise an error when no listeners exist', () => {
    expect(TimeframeStore.listeners).toHaveLength(0);

    expect(() => TimeframeStore.notifyListeners()).not.toThrow();
  });
});

describe('unload', () => {
  it('sets loaded to false', () => {
    TimeframeStore.loaded = true;

    TimeframeStore.unload();

    expect(TimeframeStore.loaded).toBe(false);
  });

  it('notifies listeners', () => {
    const listener = jest.fn();
    TimeframeStore.subscribe(listener);

    TimeframeStore.unload();

    expect(listener).toHaveBeenCalled();
  });
});

describe('updateModels', () => {
  it('groups tasks by timeframe', () => {
    const task1 = makeTask({timeframe: 'today'});
    const task2 = makeTask({timeframe: 'lustrum', pending: true});

    TimeframeStore.updateModels({tasks: [task1, task2]});

    const {timeframes} = TimeframeStore.getState();
    expect(timeframes).toHaveLength(8);

    const inboxTimeframe = timeframes[0];
    expect(inboxTimeframe.name).toBe('inbox');
    expect(inboxTimeframe.currentTasks).toEqual([]);
    expect(inboxTimeframe.pendingTasks).toEqual([]);

    const todayTimeframe = timeframes[1];
    expect(todayTimeframe.name).toBe('today');
    expect(todayTimeframe.currentTasks).toEqual([task1]);
    expect(todayTimeframe.pendingTasks).toEqual([]);

    const lustrumTimeframe = timeframes[6];
    expect(lustrumTimeframe.name).toBe('lustrum');
    expect(lustrumTimeframe.currentTasks).toEqual([]);
    expect(lustrumTimeframe.pendingTasks).toEqual([task2]);
  });

  it('sets median productivity on each timeframe', async () => {
    const promise = TimeframeStore.getAll();

    expect(request).toHaveBeenCalledTimes(2);

    const [, secondCall] = (request as jest.Mock).mock.calls;
    secondCall[0].success({meta: {medianProductivity: 15}});

    await promise;

    TimeframeStore.updateModels({tasks: []});

    const {timeframes} = TimeframeStore.getState();
    expect(timeframes).toHaveLength(8);
    timeframes.forEach(
      timeframe => expect(timeframe.medianProductivity).toBe(15),
    );
  });

  it('sets the max number of minutes for each timeframe', async () => {
    window.balanceTime = new Date('July 20, 1969 00:20:18').getTime();

    const promise = TimeframeStore.getAll();

    expect(request).toHaveBeenCalledTimes(2);

    const [, secondCall] = (request as jest.Mock).mock.calls;
    secondCall[0].success({meta: {medianProductivity: 10800}});

    await promise;

    TimeframeStore.updateModels({tasks: []});

    const {timeframes} = TimeframeStore.getState();
    expect(timeframes).toHaveLength(8);
    expect(timeframes[0]).toMatchObject({name: 'inbox', minuteMax: Infinity});
    expect(timeframes[1]).toMatchObject({name: 'today', minuteMax: 180});
    expect(timeframes[2]).toMatchObject({name: 'week', minuteMax: 540});
    expect(timeframes[3]).toMatchObject({name: 'month', minuteMax: 450});
    expect(timeframes[4]).toMatchObject({name: 'quarter', minuteMax: 5490});
    expect(timeframes[5]).toMatchObject({name: 'year', minuteMax: 8280});
    expect(timeframes[6]).toMatchObject({name: 'lustrum', minuteMax: Infinity});
    expect(timeframes[7]).toMatchObject({name: 'decade', minuteMax: Infinity});
  });
});
