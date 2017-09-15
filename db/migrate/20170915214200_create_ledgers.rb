class CreateLedgers < ActiveRecord::Migration[5.1]
  def change
    create_table :ledgers do |t|
      t.integer :balance

      t.timestamps
    end
  end
end
