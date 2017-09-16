ActiveAdmin.register Ledger do
  permit_params :balance

  index do
    selectable_column
    id_column
    column :balance
    column :created_at
    actions
  end

  filter :balance
  filter :created_at

  form do |f|
    f.inputs do
      f.input :balance
    end
    f.actions
  end

end
