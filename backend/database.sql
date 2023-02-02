/* On desactive la verification des clés étrangères*/
SET foreign_key_checks = 0;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    city varchar(255) DEFAULT NULL,
    language varchar(255) DEFAULT NULL,
    hashedPassword varchar(255) NOT NULL,
   isAdmin tinyint(1) NOT NULL DEFAULT 0
); 

INSERT INTO
  user (firstname, lastname, email, city, language, hashedPassword, isAdmin)
VALUES
  (
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English',
    "$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ",
    0
  ),(
    'Valeriy',
    'Appius',
    'valeriy.ppius@example.com',
    'Moscow',
    'Russian',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw',
    0
  ),(
    'Quentin',
    'Ferrari',
    'quentin.ferrarijunk@gmail.com',
    'Lyon',
    'English',
    "$argon2id$v=19$m=65536,t=5,p=1$qVvMZrFDu7MK6q1EfMLP9A$MlFGaQAXzsxGW4Vx+h61X4YNCIbMixiYodGXXnqy1tE",
    1
  );


DROP TABLE IF EXISTS article;
CREATE TABLE article (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content varchar(255) NOT NULL,
  picture varchar(255) DEFAULT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO article (title, content, picture, user_id) VALUES ('chat', 'boule de poils maléfique', 'src/media/cat.jpg', 1),
('Chien', 'Mon autre super contenu', 'src/media/puppy.jpg', 2);


/* On reactive la verification des clés étrangères*/
SET foreign_key_checks = 1;
