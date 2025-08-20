INSERT INTO recipes (id, title, intro, image_url) 
    VALUES (1, 'Sokker', 'Raglansokker med tott og kokk mønster', 'https://tove-kari.com/cdn/shop/files/DM_20240605175954_001_1_800x.jpg?v=1718247751');

SELECT * FROM recipes;

UPDATE recipes
    SET title = 'Tottsokker'
    WHERE id = 1;

DELETE FROM recipes WHERE id = 1;
