class CreateProjectContents < ActiveRecord::Migration
  def change
    create_table :project_contents do |t|
      t.references :project, index: true, foreign_key: true
      t.string :type
      t.string :title
      t.string :value
      t.string :link

      t.timestamps null: false
    end
  end
end
