# frozen_string_literal: true

module TagHelper
  def tag_button(tag, task:, slug:)
    link_to(
      tag_button_text(tag),
      tag_button_path(tag),
      class: tag_button_classes(tag, task:, slug:),
      data: { turbo_frame: "_top" },
    )
  end

  def tag_button_classes(tag, task:, slug:)
    [
      "button",
      "btn",
      "btn-default",
      ("active" if tag_selected?(tag, slug)),
      ("current" if task.tag_ids.include?(tag.id)),
      ("priority-#{tag.priority}-btn" if tag.priority),
    ].compact
  end

  def tag_button_path(tag)
    tag.slug.empty? ? root_path : tag_path(tag.slug)
  end

  def tag_button_text(tag)
    "#{tag.name} (#{tag.tasks.length})"
  end

  private

  # With no tag chosen the user is looking at everything, so All is the one
  # standing out.
  def tag_selected?(tag, slug)
    return tag.slug == slug if slug.present?

    tag.name == "All"
  end
end
