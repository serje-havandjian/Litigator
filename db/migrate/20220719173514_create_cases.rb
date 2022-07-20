class CreateCases < ActiveRecord::Migration[7.0]
  def change
    create_table :cases do |t|
      t.string :name
      t.string :counsel
      t.date :date_case_filed
      t.date :date_complaint_served

      t.timestamps
    end
  end
end
