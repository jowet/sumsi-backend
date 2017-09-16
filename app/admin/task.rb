ActiveAdmin.register Task do
  permit_params :title, :value, :state, :ledger_id

  index do
    selectable_column
    id_column
    column :title
    column :value
    column :state
    column :ledger
    column :created_at
    actions
  end

  scope :all, default: true
  scope :opened
  scope :completed
  scope :closed

  filter :title
  filter :value
  filter :state
  filter :ledger
  filter :created_at

  form do |f|
    f.inputs do
      f.input :title
      f.input :value
      f.input :state
      f.input :ledger
    end
    f.actions
  end

end
