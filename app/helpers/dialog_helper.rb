# frozen_string_literal: true

module DialogHelper
  def dialog_link_to(text, path)
    link_to(text, path, data: { turbo: true, turbo_frame: 'dialog' })
  end
end
