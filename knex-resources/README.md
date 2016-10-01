## How to run this example

```bash
# Create the database and tables
$ mysql -u root
mysql> CREATE DATABASE chatter;
Query OK, 1 row affected (0.00 sec)

mysql> exit
Bye
$ cd knex-resources
$ node migrate.js create
Tables created!
$ node model-example.js
Created user: { name: 'Anon', hobby: 'hacking', id: 1 }
Created 3 new users: [ { name: 'Alice', hobby: 'programming', id: 2 },
  { name: 'Bob', hobby: 'gaming', id: 3 },
  { name: 'Carly', hobby: 'crafting', id: 4 } ]
```
