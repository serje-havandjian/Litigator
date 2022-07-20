class CreateDeadlines < ActiveRecord::Migration[7.0]
  def change
    create_table :deadlines do |t|
      t.string :title
      t.date :deadline
      t.integer :case_id
      t.integer :trigger_id

      t.timestamps
    end
  end
end
