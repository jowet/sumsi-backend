# README

# create task
curl -XPOST -H "Content-type: application/json" -d '{"task": {"title": "foo bar baz", "value": 1337, "state": "opened"}}' 'http://localhost:3000/api/ledgers/1/tasks'


# change task data
curl -XPATCH -H "Content-type: application/json" -d '{"task": {"title": "foo bar baz", "value": 1337}}' 'http://localhost:3000/api/ledgers/1/tasks/2'


# close task
curl -XPATCH -H "Content-type: application/json" -d '{"task": {"title": "foo bar baz", "value": 1337, "state": "closed"}}' 'http://localhost:3000/api/ledgers/1/tasks/1'


# complete task
curl -XPATCH -H "Content-type: application/json" -d '{"task": {"state": "completed"}}' 'http://localhost:3000/api/ledgers/1/tasks/1'
