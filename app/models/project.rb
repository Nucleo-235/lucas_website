# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  name        :string
#  type        :string
#  summary     :string
#  thumb_image :string
#  logo_image  :string
#  sort_order  :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string
#

class Project < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :project_contents
  accepts_nested_attributes_for :project_contents

  mount_uploader :logo_image, StandardImageUploader
  mount_uploader :thumb_image, StandardImageUploader

  translates :summary, :title
end
