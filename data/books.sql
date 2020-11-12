DROP TABLE IF EXISTS journybooks;
CREATE TABLE journybooks (
    id SERIAL PRIMARY KEY,    
    title VARCHAR(255),    
    author VARCHAR(255),    
    isbn VARCHAR(255),    
    image_url  VARCHAR(255),
    descr VARCHAR(5000),
    bookid VARCHAR(5000) 
  );
  