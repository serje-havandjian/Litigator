class CreateMilestonesForAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :milestones_for_answers do |t|
      t.string :m1
      t.string :m2
      t.string :m3
      t.string :m4
      t.integer :deadline_id

      t.timestamps
    end
  end
end
