class Case < ApplicationRecord

    has_many :deadlines
    has_many :triggers, through: :deadlines

end
