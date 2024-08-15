const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Movie = require('../src/models/Movie');

beforeAll(async () => {
  await mongoose.connect('mongodb://0.0.0.0/testdb');
});

beforeEach(async () => {
  await Movie.deleteMany({});
});

afterAll(async () => {
  // Disconnects from the database
  await mongoose.disconnect();
});

describe('Movie API', () => {
  it('should get all movies', async () => {
    // Inserting a movie into the database before testing
    await Movie.create({
      _id: '605c72ef8e19d9d0b8e5f5e1',
      title: 'Sample Movie',
      timeSlots: [{ _id: '605c72ef8e19d9d0b8e5f5e2', capacity: 100, booked: 50 }]
    });

    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should return availability for a time slot', async () => {
    // Inserting a movie with time slots into the database before testing
    const movie = new Movie({
      _id: '605c72ef8e19d9d0b8e5f5e1',
      title: 'Sample Movie',
      timeSlots: [{ _id: '605c72ef8e19d9d0b8e5f5e2', capacity: 100, booked: 50 }]
    });
    await movie.save();

    const response = await request(app).get('/movies/605c72ef8e19d9d0b8e5f5e1/slots/605c72ef8e19d9d0b8e5f5e2/availability');
    expect(response.status).toBe(200);
    expect(response.body.remainingCapacity).toBe(50);
  });

  it('should successfully reserve a time slot', async () => {
    // Inserting a movie with time slots into the database before testing
    const movie = new Movie({
      _id: '605c72ef8e19d9d0b8e5f5e1',
      title: 'Sample Movie',
      timeSlots: [{ _id: '605c72ef8e19d9d0b8e5f5e2', capacity: 100, booked: 50 }]
    });
    await movie.save();

    const response = await request(app)
      .post('/movies/605c72ef8e19d9d0b8e5f5e1/slots/605c72ef8e19d9d0b8e5f5e2/reserve')
      .send({ numberOfPeople: 20 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Reservation successful');
    expect(response.body.updatedTimeSlot.booked).toBe(70);
  });
});