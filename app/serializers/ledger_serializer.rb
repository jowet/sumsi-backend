class LedgerSerializer < ActiveModel::Serializer # :nodoc:
  attributes :id, :balance

  has_many :tasks
end
