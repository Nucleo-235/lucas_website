# == Schema Information
#
# Table name: project_contents
#
#  id          :integer          not null, primary key
#  project_id  :integer
#  type        :string
#  title       :string
#  value       :string
#  link        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  side_margin :integer
#

class ImageProjectContent < ProjectContent
end
