class CreateMilestonesForDemurrers < ActiveRecord::Migration[7.0]
  def change
    create_table :milestones_for_demurrers do |t|
      t.string :m1
      t.string :m2
      t.string :m3
      t.string :m4
      t.string :m5
      t.string :m6
      t.string :m7
      t.string :m8
      t.integer :deadline_id

      t.timestamps
    end
  end
end
