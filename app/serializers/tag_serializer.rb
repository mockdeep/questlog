# frozen_string_literal: true

class TagSerializer
  include Serializable

  serialize(:id, :name, :rules, :slug)
end
