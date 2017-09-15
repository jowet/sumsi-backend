class TaskSerializer < ActiveModel::Serializer # :nodoc:
  attributes :id, :title, :value, :state

  belongs_to :ledger
end
