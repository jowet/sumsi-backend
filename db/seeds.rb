# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# CLEANUP
Ledger.delete_all
Task.delete_all

# LEDGER
ledger = Ledger.create(balance: 0)

# TASKS
Task.create(title: 'Clean room',       value: 100, ledger: ledger)
Task.create(title: 'Fill dishwasher',  value: 150, ledger: ledger)
Task.create(title: 'Empty dishwasher', value: 200, ledger: ledger)
