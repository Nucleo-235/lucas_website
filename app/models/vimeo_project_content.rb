# == Schema Information
#
# Table name: project_contents
#
#  id           :integer          not null, primary key
#  project_id   :integer
#  type         :string
#  title        :string
#  value        :string
#  link         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  side_margin  :integer
#  left_margin  :float            default(0.0)
#  right_margin :float            default(0.0)
#  width        :float            default(100.0)
#  sort_order   :integer
#  height       :float
#

class VimeoProjectContent < ProjectContent
end
