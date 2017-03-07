class PagesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :set_locale, only: [:home]
  skip_before_action :persist_locale, only: [:home]
  before_action :redirect_to_locale_if_not_set, only: [:home]

  def home
    @projects = Project.all.order(:sort_order)
    if @can_edit
      @new_project = Project.new
    end
  end
end
