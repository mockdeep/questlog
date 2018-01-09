class TagSerializer

  include Serializable

  serialize(:id, :name, :rules, :slug)

end
