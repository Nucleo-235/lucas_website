class AddSideMarginToProjectContent < ActiveRecord::Migration
  def change
    add_column :project_contents, :side_margin, :integer
  end
end
