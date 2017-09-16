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
Task.create(title: 'Clean room',       value: 100, ledger: ledger)
Task.create(title: 'Fill dishwasher',  value: 150, ledger: ledger)
Task.create(title: 'Empty dishwasher', value: 200, ledger: ledger)
