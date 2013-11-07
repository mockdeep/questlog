module QuickiesHelper

  def quickie_classes(quickie)
    classes = []
    classes << "priority#{quickie.priority}" if quickie.priority?
    classes << "over_skipped" if quickie.over_skipped?
    classes.join(' ')
  end

end
