const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Library API', () => {
    // Test root endpoint
    test('GET / should return API welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome to the Library API");
    });

    // GET all books
    test('GET /api/books should return all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // GET specific book (exists)
    test('GET /api/books/1 should return a specific book', async () => {
        const res = await request(app).get('/api/books/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("The Great Gatsby");
    });

    // GET specific book (does not exist)
    test('GET /api/books/999 should return 404', async () => {
        const res = await request(app).get('/api/books/999');
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Book not found');
    });

    // POST add a new book
    test('POST /api/books should add a new book', async () => {
        const newBook = {
            title: "New Book",
            author: "Test Author",
            genre: "Test Genre",
            copiesAvailable: 4
        };

        const res = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newBook.title);
    });

    // PUT update existing book
    test('PUT /api/books/1 should update a book', async () => {
        const updatedBook = {
            title: "Updated Title",
            author: "Updated Author",
            genre: "Updated Genre",
            copiesAvailable: 10
        };

        const res = await request(app)
            .put('/api/books/1')
            .send(updatedBook);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Title");
    });

    // PUT book that does not exist
    test('PUT /api/books/999 should return 404', async () => {
        const res = await request(app)
            .put('/api/books/999')
            .send({});
        expect(res.statusCode).toBe(404);
    });

    // DELETE a book
    test('DELETE /api/books/2 should delete a book', async () => {
        const res = await request(app).delete('/api/books/2');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Book deleted successfully');
    });

    // DELETE book that does not exist
    test('DELETE /api/books/999 should return 404', async () => {
        const res = await request(app).delete('/api/books/999');
        expect(res.statusCode).toBe(404);
    });

});
