\c vita_track

-- users seed data
INSERT INTO users (username, first_name, last_name, email, password, dob, weight, height, activity_level, goal, blood_sugar_level, privacy_setting, last_check_in, dietary_preferences, medication_reminder) 
VALUES 
  ('User1', 'John', 'Doe', 'user1@example.com', 'password1', '1990-01-01', 75.0, 180.0, 'low', 'maintain', ARRAY[4.5, 5.1, 4.2, 4.6], false, '2023-05-01', 'none', true),
  ('User2', 'Jane', 'Doe', 'user2@example.com', 'password2', '1992-02-02', 60.0, 170.0, 'medium', 'lose', ARRAY[4.9, 5.3, 4.8, 5.0], true, '2023-05-02', 'vegan', false),
  ('User3', 'Bob', 'Smith', 'user3@example.com', 'password3', '1988-03-03', 80.0, 175.0, 'high', 'gain', ARRAY[5.1, 5.2, 4.9, 5.0], false, '2023-05-03', 'vegetarian', true),
  ('User4', 'Alice', 'Johnson', 'user4@example.com', 'password4', '1995-04-04', 65.0, 165.0, 'medium', 'maintain', ARRAY[4.7, 5.0, 4.8, 4.9], true, '2023-05-04', 'none', false),
  ('User5', 'Charlie', 'Brown', 'user5@example.com', 'password5', '1990-05-05', 70.0, 175.0, 'low', 'lose', ARRAY[4.6, 5.1, 4.7, 4.8], false, '2023-05-05', 'pescatarian', true),
  ('User6', 'Lucy', 'Green', 'user6@example.com', 'password6', '1992-06-06', 62.0, 160.0, 'high', 'gain', ARRAY[4.9, 5.2, 5.0, 5.1], true, '2023-05-06', 'vegetarian', false),
  ('User7', 'Tom', 'Gray', 'user7@example.com', 'password7', '1987-07-07', 80.0, 185.0, 'medium', 'maintain', ARRAY[5.0, 5.3, 5.1, 5.2], false, '2023-05-07', 'vegan', true),
  ('User8', 'Ella', 'White', 'user8@example.com', 'password8', '1993-08-08', 68.0, 170.0, 'low', 'lose', ARRAY[4.8, 5.0, 4.9, 5.1], true, '2023-05-08', 'none', false);

-- achievements seed data
INSERT INTO achievements (user_id, achievement) 
VALUES 
  (1, 'Completed a 5K run'),
  (2, 'Went an entire week without consuming sugar'),
  (3, 'Walked over 10,000 steps every day for a month'),
  (4, 'Completed a marathon'),
  (5, 'Cooked healthy meals at home for a week'),
  (6, 'Went to the gym 4 times a week for a month'),
  (7, 'Went on a 50-mile bike ride'),
  (8, 'Ate 5 servings of fruits and vegetables every day for a month');

-- allergies seed data
INSERT INTO allergies (user_id, allergy) 
VALUES 
  (1, 'Peanuts'),
  (1, 'Shellfish'),
  (2, 'Dairy'),
  (2, 'Soy'),
  (3, 'Eggs'),
  (4, 'Wheat'),
  (5, 'Fish'),
  (6, 'Tree Nuts'),
  (7, 'Mold'),
  (8, 'Dust Mites');

-- medications seed data
INSERT INTO medications (user_id, medication) 
VALUES 
  (1, 'Ibuprofen'),
  (1, 'Aspirin'),
  (2, 'Lisinopril'),
  (2, 'Atorvastatin'),
  (3, 'Levothyroxine'),
  (4, 'Metformin'),
  (5, 'Amlodipine'),
  (6, 'Metoprolol'),
  (7, 'Omeprazole'),
  (8, 'Simvastatin');
