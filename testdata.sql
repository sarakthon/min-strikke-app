INSERT INTO recipes (title, intro, image_url) 
    VALUES ('Sokker', 'Raglansokker med tott og kokk mønster', 'https://tove-kari.com/cdn/shop/files/DM_20240605175954_001_1_800x.jpg?v=1718247751');
INSERT INTO recipes (title, intro, image_url) 
    VALUES ('Skjerf', 'varmt skjerf til høstu', 'https://www.fernerjacobsen.no/pub_images/original/10503951-1.jpeg');

SELECT * FROM recipes;

UPDATE recipes
    SET title = 'Tottsokker'
    WHERE id = 1;

DELETE FROM recipes WHERE id = 1;
