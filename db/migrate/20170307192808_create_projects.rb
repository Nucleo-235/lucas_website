class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :type
      t.string :summary
      t.string :thumb_image
      t.string :logo_image
      t.string :sort_order
      t.string :slug

      t.timestamps null: false
    end
  end
end
