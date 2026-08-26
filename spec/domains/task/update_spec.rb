# frozen_string_literal: true

RSpec.describe Task::Update do
  let(:user) { create(:user) }
  let(:task) { create(:task, estimate_seconds: 301, user:) }
  let(:task_update) { described_class.new }
  let(:task_update_params) do
    {
      title: "foo",
      tag_names: ["home"],
      priority: 3,
      estimate_seconds: 300,
    }
  end

  it "updates the task" do
    task_update.(task, task_update_params)
    task.reload
    expect(task.title).to eq "foo"
    expect(task.tag_names).to eq ["home"]
    expect(task.priority).to eq 3
    expect(task.estimate_seconds).to eq 300
  end

  it "does not update the stat count when the task is not marked complete" do
    expect do
      task_update.(task, task_update_params)
    end.not_to change(Stat, :count)
  end

  it "does not update the stat count when the task is postponed" do
    expect do
      task_update.(task, task_update_params.merge(postpone: 300))
    end.not_to change(Stat, :count)
  end

  it "clears the timeframe when moved to the inbox" do
    task.update!(timeframe: "today")
    task_update.(task, task_update_params.merge(timeframe: "inbox"))
    expect(task.reload.timeframe).to be_nil
  end

  it "sets the timeframe when given a real timeframe" do
    task_update.(task, task_update_params.merge(timeframe: "week"))
    expect(task.reload.timeframe).to eq "week"
  end

  describe "moving a task to a new position" do
    let!(:first) { create(:task, position: 1, user:) }
    let!(:second) { create(:task, position: 2, user:) }
    let!(:third) { create(:task, position: 3, user:) }

    def positions
      [first, second, third].map { |task| task.reload.position }
    end

    it "pushes the displaced tasks down when moved up" do
      task_update.(third, { position: 1 })

      expect(third.reload.position).to eq 1
      expect(positions).to eq [2, 3, 1]
    end

    it "pulls the displaced tasks up when moved down" do
      task_update.(first, { position: 3 })

      expect(first.reload.position).to eq 3
      expect(positions).to eq [3, 1, 2]
    end

    it "accepts a position submitted as a string" do
      task_update.(third, { position: "1" })

      expect(positions).to eq [2, 3, 1]
    end

    it "leaves the other tasks alone when the position is unchanged" do
      expect { task_update.(second, { position: 2 }) }
        .not_to(change { positions })
    end

    it "leaves the other tasks alone when given no position" do
      expect { task_update.(second, { title: "foo" }) }
        .not_to(change { positions })
    end

    it "does not move another user's tasks" do
      stranger = create(:task, position: 1)

      task_update.(third, { position: 1 })

      expect(stranger.reload.position).to eq 1
    end

    it "moves every task sharing a displaced position" do
      duplicate = create(:task, position: 1, user:)

      task_update.(third, { position: 1 })

      expect(duplicate.reload.position).to eq 2
      expect(positions).to eq [2, 3, 1]
    end
  end

  it "updates the stats for the day when the task has been marked complete" do
    allow(task).to receive(:persisted?).and_return(false)
    expect do
      task_update.(task, task_update_params.merge(done: true))
    end.to change(Stat, :count).by(1)
    stat = Stat.last
    expect(stat.timestamp).to eq Time.zone.now.beginning_of_day
    expect(stat.user).to eq user
    expect(stat.value).to eq 300
    expect(stat.name).to eq "seconds-completed"
  end
end
