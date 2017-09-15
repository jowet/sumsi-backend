class Ledger < ApplicationRecord # :nodoc:
  # Associations
  #-----------------------------------------------------------------

  has_many :tasks
end
