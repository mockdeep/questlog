class BulkTaskUpdate

  include Callable

  def call(user:, positions:)
    user.tasks.reposition(positions.map(&:to_i))
  end

end
