# frozen_string_literal: true

RSpec.describe ToEnglish, ".seconds" do
  it "gives nothing at all a name" do
    expect(described_class.seconds(0)).to eq("None")
  end

  it "counts a single second" do
    expect(described_class.seconds(1)).to eq("1 second")
  end

  it "counts several seconds" do
    expect(described_class.seconds(10)).to eq("10 seconds")
  end

  it "rounds a fraction of a second down" do
    expect(described_class.seconds(32.5)).to eq("32 seconds")
  end

  it "counts whole minutes once there is a minute" do
    expect(described_class.seconds(65)).to eq("1 minute")
  end

  it "rounds the leftover seconds off a count of minutes" do
    expect(described_class.seconds(305)).to eq("5 minutes")
  end

  it "counts a single hour" do
    expect(described_class.seconds(3600)).to eq("1 hour")
  end

  it "counts hours and minutes together" do
    expect(described_class.seconds(7265)).to eq("2 hours, 1 minute")
  end

  it "refuses a negative number" do
    expect { described_class.seconds(-1) }
      .to raise_error(RangeError, "number must not be negative")
  end
end
