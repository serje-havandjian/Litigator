class Trigger < ApplicationRecord

    has_many :deadlines
    has_many :cases, through: :deadlines

end
