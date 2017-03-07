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
#

class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :summary, :thumb_image, :logo_image, :sort_order, :slug
end
