class Task < ApplicationRecord # :nodoc:
  # Associations
  #-----------------------------------------------------------------

  belongs_to :ledger

  # Concerns
  #-----------------------------------------------------------------

  include AASM

  # Validations
  #-----------------------------------------------------------------

  validates :title,
            presence: true

  validates :value,
            numericality: {
              only_integer: true,
              greater_than: 0
            }

  validates :ledger,
            presence: true

  # State Machine
  #-----------------------------------------------------------------

  enum state: {
    opened:    0,
    completed: 1,
    closed:    2
  }

  aasm column: :state, enum: true do
    state :opened, initial: true
    state :completed
    state :closed

    event :complete do
      transitions from: :opened, to: :completed
    end

    event :close, success: :after_success do
      transitions from: %i(opened completed), to: :closed
    end
  end

  private

  def after_success
    ledger.balance += value
    ledger.save!
  end
end
