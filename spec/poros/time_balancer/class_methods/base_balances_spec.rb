# frozen_string_literal: true

RSpec.describe TimeBalancer, ".base_balances" do
  it "gives today a single day" do
    balances = described_class.base_balances(moon_landing)

    expect(balances[:today]).to eq(1)
  end

  it "gives this week the days left in it" do
    balances = described_class.base_balances(moon_landing)

    expect(balances[:week]).to eq(6)
  end

  it "gives this month the days between the week's end and its own" do
    balances = described_class.base_balances(moon_landing)

    expect(balances[:month]).to eq(5)
  end

  it "gives this quarter the days between the month's end and its own" do
    balances = described_class.base_balances(moon_landing)

    expect(balances[:quarter]).to eq(61)
  end

  it "gives this year the days between the quarter's end and its own" do
    balances = described_class.base_balances(moon_landing)

    expect(balances[:year]).to eq(92)
  end

  it "leaves the open ended timeframes out" do
    balances = described_class.base_balances(moon_landing)

    expect(balances.keys).to eq([:today, :week, :month, :quarter, :year])
  end

  it "never ends a timeframe before the end of this week" do
    new_years_eve = Time.zone.parse("December 31, 2020 12:00:00")

    balances = described_class.base_balances(new_years_eve)

    expect(balances[:month]).to eq(0)
  end

  # a Sunday, so the week runs another six days
  def moon_landing
    Time.zone.parse("July 20, 1969 00:20:18")
  end
end
