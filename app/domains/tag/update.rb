# frozen_string_literal: true

class Tag < ApplicationRecord
  class Update
    include JunkDrawer::Callable

    def call(tag, tag_params)
      tag.update!(deduplicate_rules(tag_params))
    end

    private

    def deduplicate_rules(tag_params)
      return tag_params unless tag_params.key?(:rules)

      tag_params.merge(rules: tag_params[:rules].uniq)
    end
  end
end
