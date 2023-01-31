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
    avatar varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  user (firstname, lastname, email, city, language, hashedPassword)
VALUES
  (
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English',
    "$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ"
  ),(
    'Valeriy',
    'Appius',
    'valeriy.ppius@example.com',
    'Moscow',
    'Russian',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw'
  ),(
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
    'New York',
    'Italian',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZXphZGF6ZGQ$a0bg5DZB6H6v3jjQC81DXg'
  ),(
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
    'New York',
    'German',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA'
  ),(
    'Jane',
    'Doe',
    'jane.doe@example.com',
    'London',
    'English',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw'
  ),(
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
    'Milan',
    'Spanish',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$UKaGZ9hGFn/S5SBQDMe/Uw'
  );


DROP TABLE IF EXISTS article;
CREATE TABLE article (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content varchar(255) NOT NULL,
  picture varchar(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO article (title, content, picture, user_id) VALUES ('chat', 'boule de poils maléfique', './src/media/cat.jpg', 1),
('Chien', 'Mon autre super contenu', './src/media/puppy.jpg', 2);


/* On reactive la verification des clés étrangères*/
SET foreign_key_checks = 1;
