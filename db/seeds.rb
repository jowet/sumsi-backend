# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# CLEANUP

AdminUser.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('admin_users')

Ledger.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('ledgers')

Task.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('tasks')

# ADMIN USER
AdminUser.create!(email: 'sumsi@example.com', password: '123123', password_confirmation: '123123')

# LEDGER
ledger = Ledger.create(balance: 0)

# TASKS
2.times do
  Task.create(title: 'Clean your room',      value: 100, ledger: ledger, state: 'completed')
  Task.create(title: 'Fill the dishwasher',  value: 100, ledger: ledger, state: 'completed')
  Task.create(title: 'Empty the dishwasher', value: 300, ledger: ledger, state: 'completed')
end
Task.create(title: 'Bring out the trash', value: 37, ledger: ledger, state: 'completed')
Task.all.map(&:close!)

Task.create(title: 'Empty the dishwasher', value: 300, ledger: ledger)
