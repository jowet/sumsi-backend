class Ledger < ApplicationRecord # :nodoc:
  # Associations
  #-----------------------------------------------------------------

  has_many :tasks

  # Validations
  #-----------------------------------------------------------------

  validates :balance,
            numericality: {
              only_integer: true
            }
end
