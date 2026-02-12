import autobind from "class-autobind";
import {Component} from "react";
import type {ReactElement} from "react";

import {ToEnglish, assert} from "helpers";

import TimeframeStore from "src/timeframe/store";
import TimeframeSection from "src/timeframe/components/section";
import {calculateTotalMinutes} from "src/timeframe/utils";
import type {UpdateTask} from "src/task/action_creators";

function timeframeHasTasks(timeframe: Timeframe): boolean {
  return timeframe.currentTasks.length > 0 || timeframe.pendingTasks.length > 0;
}

type Props = {
  deleteTask: (taskId: number) => void,
  updateTask: UpdateTask,
};

type State = {
  loading: boolean;
  medianProductivity: number | null;
  timeframes: Timeframe[];
};

class TimeframeListView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {timeframes: [], medianProductivity: null, loading: true};
    autobind(this);
  }

  componentDidMount(): void {
    TimeframeStore.getAll().then((data: TimeframeData) => {
      this.updateTimeframes(data);
      TimeframeStore.subscribe(this.loadTasks);
    });
  }

  loadTasks(): void {
    TimeframeStore.getAll().then(this.updateTimeframes);
  }

  updateTimeframes(data: TimeframeData): void {
    this.setState({
      timeframes: data.timeframes,
      medianProductivity: data.meta.medianProductivity,
      loading: false,
    });
  }

  productivityString(): string {
    const {medianProductivity} = this.state;

    return ToEnglish.seconds(assert(medianProductivity));
  }

  timeframeSpace(): TimeframeSpace {
    const {timeframes} = this.state;
    const counts: TimeframeSpace = {};

    timeframes.forEach((timeframe: Timeframe) => {
      const minuteTotal = calculateTotalMinutes(timeframe);

      counts[timeframe.name] = timeframe.minuteMax - minuteTotal;
    });

    return counts;
  }

  renderTimeframe(timeframe: Timeframe): ReactElement {
    const {deleteTask, updateTask} = this.props;

    return (
      <TimeframeSection
        key={timeframe.name}
        timeframe={timeframe}
        timeframeSpace={this.timeframeSpace()}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  renderedTimeframes(): ReactElement[] {
    return this.timeframesWithTasks().map(this.renderTimeframe);
  }

  timeframesWithTasks(): Timeframe[] {
    const {timeframes} = this.state;

    return timeframes.filter(timeframeHasTasks);
  }

  render(): ReactElement {
    const {loading} = this.state;

    if (loading) {
      return (
        <header className='timeframes-header'>
          <h2>{"Loading Timeframes..."}</h2>
        </header>
      );
    }

    return (
      <div>
        <header className='timeframes-header'>
          <h2>{`Median Productivity: ${this.productivityString()} per day`}</h2>
        </header>
        {this.renderedTimeframes()}
      </div>
    );
  }
}

export default TimeframeListView;
