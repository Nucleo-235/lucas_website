class AddTranslateFieldsToProjectContents < ActiveRecord::Migration
  def change
    reversible do |dir|
      dir.up do
        ProjectContent.create_translation_table!({
          :title => :string,
          :value => :string,
          :link  => :string
        }, {
          :migrate_data => true
        })
      end

      dir.down do
        ProjectContent.drop_translation_table! :migrate_data => true
      end
    end
  end
end
