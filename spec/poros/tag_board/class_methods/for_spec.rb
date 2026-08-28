# frozen_string_literal: true

# The cases here come from the vitest suite that covered tag/selectors.ts
# before this replaced it, so the two agree on every rule.
RSpec.describe TagBoard, ".for" do
  def names(user, slug: "")
    described_class.for(user:, slug:).tags.map(&:name)
  end

  def estimated_task(user, **attrs)
    create(:task, user:, estimate_seconds: 1.hour, **attrs)
  end

  def named_tag(user, name)
    create(:tag, user:, name:)
  end

  def rule_tag(user, name, **rule)
    create(:tag, user:, name:, rules: [rule])
  end

  it "claims a task for the tags it carries" do
    user = create(:user)
    estimated_task(user, tags: [named_tag(user, "home")])

    expect(names(user)).to eq(["All", "home"])
  end

  it "leaves out tags that no task claims" do
    user = create(:user)
    named_tag(user, "home")
    estimated_task(user, tags: [named_tag(user, "work")])

    expect(names(user)).to eq(["All", "work"])
  end

  it "orders the tags by name" do
    user = create(:user)
    estimated_task(user, tags: [named_tag(user, "beta")])
    estimated_task(user, tags: [named_tag(user, "alpha")])

    expect(names(user)).to eq(["All", "alpha", "beta"])
  end

  it "counts the tasks each tag claims" do
    user = create(:user)
    tag = named_tag(user, "home")
    2.times { estimated_task(user, tags: [tag]) }

    expect(described_class.for(user:).tags.last.tasks.length).to eq(2)
  end

  it "takes a tag's priority from the most urgent task it claims" do
    user = create(:user)
    tag = named_tag(user, "home")
    estimated_task(user, priority: 3, tags: [tag])
    estimated_task(user, priority: 2, tags: [tag])

    expect(described_class.for(user:).tags.last.priority).to eq(2)
  end

  it "leaves a tag without a priority when its tasks have none" do
    user = create(:user)
    estimated_task(user, tags: [named_tag(user, "home")])

    expect(described_class.for(user:).tags.last.priority).to be_nil
  end

  it "claims every workable task for a tag ruled isActive" do
    user = create(:user)
    rule_tag(user, "any", check: "isActive")
    estimated_task(user)

    expect(names(user)).to eq(["All", "Untagged", "any"])
  end

  it "claims a task whose field is unset for a tag ruled isBlank" do
    user = create(:user)
    rule_tag(user, "guess", check: "isBlank", field: "estimateSeconds")
    create(:task, user:, estimate_seconds: nil)

    expect(names(user)).to eq(["All", "Needs Estimate", "Untagged", "guess"])
  end

  it "passes over a task whose field is set for a tag ruled isBlank" do
    user = create(:user)
    rule_tag(user, "guess", check: "isBlank", field: "estimateSeconds")
    estimated_task(user, tags: [named_tag(user, "work")])

    expect(names(user)).to eq(["All", "work"])
  end

  it "claims a task whose field is empty for a tag ruled isEmpty" do
    user = create(:user)
    rule_tag(user, "bare", check: "isEmpty", field: "tagIds")
    estimated_task(user)

    expect(names(user)).to eq(["All", "Untagged", "bare"])
  end

  it "passes over a task whose field is filled for a tag ruled isEmpty" do
    user = create(:user)
    rule_tag(user, "bare", check: "isEmpty", field: "tagIds")
    estimated_task(user, tags: [named_tag(user, "work")])

    expect(names(user)).to eq(["All", "work"])
  end

  it "refuses a rule it has no check for" do
    user = create(:user)
    rule_tag(user, "odd", check: "isWhatever")
    estimated_task(user)

    expect { names(user) }.to raise_error(ArgumentError, /isWhatever/)
  end

  it "refuses a rule it has no field for" do
    user = create(:user)
    rule_tag(user, "odd", check: "isBlank", field: "whatever")
    estimated_task(user)

    expect { names(user) }.to raise_error(ArgumentError, /whatever/)
  end

  it "shows the first task of the tag being looked at" do
    user = create(:user)
    create(:task, user:, title: "unrelated")
    create(:task, user:, title: "tagged", tags: [named_tag(user, "home")])

    expect(described_class.for(user:, slug: "home").task.title).to eq("tagged")
  end

  it "shows the first task overall when no tag is being looked at" do
    user = create(:user)
    create(:task, user:, title: "later", priority: 2)
    create(:task, user:, title: "sooner", priority: 1)

    expect(described_class.for(user:).task.title).to eq("sooner")
  end

  it "skips over tasks that are waiting to be released" do
    user = create(:user)
    create(:task, user:, title: "pending", release_at: 1.day.from_now)
    create(:task, user:, title: "ready")

    expect(described_class.for(user:).task.title).to eq("ready")
  end

  it "skips over tasks that have sub tasks of their own" do
    user = create(:user)
    parent = create(:task, user:, title: "parent")
    create(:task, user:, title: "child", parent_task: parent)

    expect(described_class.for(user:).task.title).to eq("child")
  end

  it "shows nothing at all when no task is claimed" do
    expect(described_class.for(user: create(:user)).task).to be_nil
  end

  it "shows nothing at all when the tag being looked at is unknown" do
    user = create(:user)
    create(:task, user:)

    expect(described_class.for(user:, slug: "nope").task).to be_nil
  end
end
