class TaskSerializer < ActiveModel::Serializer # :nodoc:
  attributes :id, :title, :value

  belongs_to :ledger
end
