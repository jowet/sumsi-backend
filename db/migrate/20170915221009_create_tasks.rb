class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :value
      t.integer :state

      t.references :ledger

      t.timestamps
    end
  end
end
