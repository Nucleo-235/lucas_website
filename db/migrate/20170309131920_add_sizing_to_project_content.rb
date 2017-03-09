class AddSizingToProjectContent < ActiveRecord::Migration
  def change
    add_column :project_contents, :left_margin, :float, default: 0
    add_column :project_contents, :right_margin, :float, default: 0
    add_column :project_contents, :width, :float, default: 100
    add_column :project_contents, :sort_order, :integer
  end
end
