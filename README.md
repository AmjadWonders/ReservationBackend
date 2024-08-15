# Circlys Reservation System

Circlys Reservation System is a Node.js application that provides a simple API for managing movie reservations. The API allows you to list movies, check availability for time slots, and reserve time slots.

## Project Structure

```
CirclysReservation/
│
├── src/
│   ├── api/
│   │   └── routes/
│   │       └── movieRoutes.js    # API routes for movie operations
│   ├── config/
│   │   └── db.js                 # Database connection configuration
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   └── Movie.js              # Mongoose model for movies
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server startup and configuration
│
├── tests/
│   └── movieRoutes.test.js       # Tests for movie API routes
│
├── node_modules/                 # Project dependencies (not tracked in git)
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── jest.config.js                # Jest configuration file
├── package-lock.json             # Locked versions of package dependencies
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmjadWonders/CirclysReservation.git
   cd CirclysReservation
   ```

2. **Install dependencies**
   Make sure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```

3. **Setup the database**
   Ensure you have MongoDB installed and running. You can use MongoDB Atlas or a local MongoDB instance.

4. **Configure environment variables**
   Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://0.0.0.0:27017/circlysreservation
   PORT=3000
   ```

## Usage

1. **Start the server**
   ```bash
   npm start
   ```
   The server will start on port 3000 by default. You can change the port by updating the `PORT` environment variable.

2. **API Endpoints**
   * **Get all movies**
     ```
     GET /movies
     ```
   * **Check availability**
     ```
     GET /movies/:movieId/slots/:slotId/availability
     ```
   * **Reserve a time slot**
     ```
     POST /movies/:movieId/slots/:slotId/reserve
     ```
     **Request Body:**
     ```json
     {
       "numberOfPeople": 5
     }
     ```

## Running Tests

1. **Install testing dependencies**
   Testing dependencies are included in `package.json`, so you only need to install them by running:
   ```bash
   npm install
   ```

2. **Run the tests**
   ```bash
   npm test
   ```
   This will run the tests defined in `tests/movieRoutes.test.js` using Jest.

## Project Configuration

* **Database Configuration**: Located in `src/config/db.js`. Configure your MongoDB connection settings here.
* **Error Handling Middleware**: Located in `src/middleware/errorHandler.js`. Customize error handling as needed.
* **Express App Setup**: Located in `src/app.js`. Configure the CirclysReservation app and middleware here.
* **Server Startup**: Located in `src/server.js`. This file is responsible for starting the server.

## Contributing

Feel free to open issues or submit pull requests for improvements. For any major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.