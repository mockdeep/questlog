class ActionResult

  attr_accessor :object, :errors

  def initialize(success:, object: nil, errors: [])
    @success = success
    @object = object
    @errors = errors
  end

  def success?
    @success
  end

  def error_message
    errors.join("\n")
  end

end
