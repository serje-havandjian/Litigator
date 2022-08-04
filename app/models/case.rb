class Case < ApplicationRecord
    
    belongs_to :user
    
    has_many :deadlines
    has_many :triggers, through: :deadlines, dependent: :destroy

    

    validates :name, :counsel, :date_case_filed, :date_complaint_served, presence: true

end
