class CreateTriggers < ActiveRecord::Migration[7.0]
  def change
    create_table :triggers do |t|
      t.string :title
      t.date :date_served
      t.string :method_of_service

      t.timestamps
    end
  end
end
