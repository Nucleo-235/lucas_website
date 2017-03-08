class AddTitleToProject < ActiveRecord::Migration
  def change
    add_column :projects, :title, :string

    reversible do |dir|
      dir.up do
        Project.add_translation_fields! title: :string
      end

      dir.down do
        remove_column :project_translations, :title
      end
    end
  end
end
