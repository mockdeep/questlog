# frozen_string_literal: true

RSpec.describe TaskDetails, ".for" do
  it "spells out how often the task repeats" do
    details = described_class.for(build(:task, repeat_seconds: 1.hour))

    expect(details).to include("Repeat: every 1 hour")
  end

  it "says so when the task does not repeat" do
    details = described_class.for(build(:task, repeat_seconds: nil))

    expect(details).to include("Repeat: never")
  end

  it "spells out how long the task is expected to take" do
    details = described_class.for(build(:task, estimate_seconds: 90.minutes))

    expect(details).to include("Estimate: 1 hour, 30 minutes")
  end

  it "says so when the task has no estimate" do
    details = described_class.for(build(:task, estimate_seconds: nil))

    expect(details).to include("Estimate: none")
  end

  it "gives the task's priority" do
    details = described_class.for(build(:task, priority: 2))

    expect(details).to include("Priority: 2")
  end

  it "says so when the task has no priority" do
    details = described_class.for(build(:task, priority: nil))

    expect(details).to include("Priority: none")
  end

  it "lists the task's tags" do
    details = described_class.for(build(:task, tag_names: ["home", "chore"]))

    expect(details).to include("Tags: home, chore")
  end

  it "says so when the task has no tags" do
    details = described_class.for(build(:task, tag_names: []))

    expect(details).to include("Tags: none")
  end
end
