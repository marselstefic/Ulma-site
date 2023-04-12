CREATE TABLE User (
  id INT NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  photo BLOB
);

CREATE TABLE Ad (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  datetime DATETIME NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  language VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Comment (
  id INT NOT NULL PRIMARY KEY,
  text TEXT NOT NULL,
  rating INT NOT NULL,
  ad_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (ad_id) REFERENCES Ad(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Message (
  id INT NOT NULL PRIMARY KEY,
  text TEXT NOT NULL,
  datetime DATETIME NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES User(id),
  FOREIGN KEY (receiver_id) REFERENCES User(id)
);