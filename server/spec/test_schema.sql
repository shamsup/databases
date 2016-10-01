CREATE DATABASE IF NOT EXISTS chat_test;

USE chat_test;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS following;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rooms;

create table users (
  id int not null auto_increment,
  username VARCHAR(25) not null,
  primary key (id),
  unique (username)
);

create table rooms (
  id int not null auto_increment,
  roomname VARCHAR(20) not null,
  primary key (id)
);

CREATE TABLE messages (
  id int not null auto_increment,
  content VARCHAR(200) not null,
  user_id int not null,
  room_id int not null,
  created datetime not null default current_timestamp,
  primary key (id),
  foreign key (user_id) references users (id),
  foreign key (room_id) references rooms (id)
);

create table following (
  clicker_id int not null,
  following_id int not null,
  primary key (clicker_id, following_id),
  foreign key (clicker_id) references users (id),
  foreign key (following_id) references users (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
