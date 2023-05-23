DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  dob DATE NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  activity_level VARCHAR(10) NOT NULL,
  goal VARCHAR(10) NOT NULL,
  blood_sugar_level FLOAT[] NOT NULL,
  privacy_setting BOOLEAN NOT NULL,
  last_check_in DATE NOT NULL,
  dietary_preferences VARCHAR(15) NOT NULL,
  medication_reminder BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS achievements CASCADE;

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  achievement TEXT NOT NULL
);

DROP TABLE IF EXISTS allergies CASCADE;

CREATE TABLE allergies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  allergy TEXT NOT NULL
);

DROP TABLE IF EXISTS medications CASCADE;

CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  medication TEXT NOT NULL
);