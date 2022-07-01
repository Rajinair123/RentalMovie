const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../../index");
const req = supertest(app);
const { Genre } = require("../../../models/genreModel");
const { User } = require("../../../models/userModel");
const { Movie } = require("../../../models/movieModel");
const { Customer } = require("../../../models/customerModel");
const { Rental } = require("../../../models/rentalModel");

describe("/api/rentals", () => {
  afterEach(async () => {
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    await Customer.deleteMany({});
    await Rental.deleteMany({});
  });
  describe("/ POST", () => {
    it("should return 401 if token is not provided", async () => {
      const res = await req.post("/api/rentals");
      expect(res.status).toBe(401);
    });
    it("should return 400 if customerId is not sent", async () => {
      const genre31 = new Genre({ name: "genre31" });
      await genre31.save();
      const customer31 = new Customer({
        name: "customer31",
        phone: "123456789",
      });
      await customer31.save();
      const movie31 = new Movie({
        title: "movie31",
        dailyRentalRate: 1.1,
        numberInStock: 13,
        genre: { name: genre31.name, _id: genre31._id },
      });
      await movie31.save();
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ movieId: movie31._id });
      expect(res.status).toBe(400);
    });
    it("should return 400 if movieId is not sent", async () => {
      const genre32 = new Genre({ name: "genre32" });
      await genre32.save();
      const customer32 = new Customer({
        name: "customer32",
        phone: "123456789",
      });
      await customer32.save();
      const movie32 = new Movie({
        title: "movie32",
        dailyRentalRate: 1.1,
        numberInStock: 13,
        genre: { name: genre32.name, _id: genre32._id },
      });
      await movie32.save();
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ customerId: customer32._id });
      expect(res.status).toBe(400);
    });
    it("should return 400 if numberInStock is zero", async () => {
      const genre33 = new Genre({ name: "genre33" });
      await genre33.save();
      const customer33 = new Customer({
        name: "customer33",
        phone: "123456789",
      });
      await customer33.save();
      const movie33 = new Movie({
        title: "movie33",
        dailyRentalRate: 1.1,
        numberInStock: 0,
        genre: { name: genre33.name, _id: genre33._id },
      });
      await movie33.save();
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ customerId: customer33._id, movieId: movie33._id });
      expect(res.status).toBe(400);
    });
    it("should save rental if data is valid", async () => {
      const genre34 = new Genre({ name: "genre34" });
      await genre34.save();
      const customer34 = new Customer({
        name: "customer34",
        phone: "123456789",
      });
      await customer34.save();
      const movie34 = new Movie({
        title: "movie34",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre34.name, _id: genre34._id },
      });
      await movie34.save();
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ customerId: customer34._id, movieId: movie34._id });
      expect(res.status).toBe(200);
      const rental = await Rental.findOne({ "movie.title": "movie34" });
      expect(rental).not.toBeNull();
      expect(rental).toHaveProperty("rentalFee", 11);
    });
    it("should send rental if data is valid", async () => {
      const genre35 = new Genre({ name: "genre35" });
      await genre35.save();
      const customer35 = new Customer({
        name: "customer35",
        phone: "123556789",
      });
      await customer35.save();
      const movie35 = new Movie({
        title: "movie35",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre35.name, _id: genre35._id },
      });
      await movie35.save();
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ customerId: customer35._id, movieId: movie35._id });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("customer.name", "customer35");
    });
    it("should decrement numberInStock of the chosen movie by 1", async () => {
      const genre36 = new Genre({ name: "genre36" });
      await genre36.save();
      const customer36 = new Customer({
        name: "customer36",
        phone: "123656789",
      });
      await customer36.save();
      let movie36 = new Movie({
        title: "movie36",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre36.name, _id: genre36._id },
      });
      await movie36.save();
      const user = new User();
      const token = user.getAuthToken();
      await req
        .post("/api/rentals")
        .set("x-auth-token", token)
        .send({ customerId: customer36._id, movieId: movie36._id });
      movie36 = await Movie.findById(movie36._id);
      expect(movie36.numberInStock).toBe(9);
    });
  });
  describe("/:id patch", () => {
    it("should return 401 if token is not provided", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await req.patch("/api/rentals/" + id);
      expect(res.status).toBe(401);
    });
    it("should return 404 if invalid id is send", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const res = await req.patch("/api/rentals/1").set("x-auth-token", token);
      expect(res.status).toBe(400);
    });
    it("should update rental if data is valid", async () => {
      const genre40 = new Genre({ name: "genre40" });
      await genre40.save();
      const customer40 = new Customer({
        name: "customer40",
        phone: "124056789",
      });
      await customer40.save();
      const movie40 = new Movie({
        title: "movie40",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre40.name, _id: genre40._id },
      });
      await movie40.save();
      let rental = new Rental({
        customer: {
          name: customer40.name,
          phone: customer40.phone,
          _id: customer40._id,
        },
        movie: {
          title: movie40.title,
          dailyRentalRate: movie40.dailyRentalRate,
          _id: movie40._id,
        },
        rentalFee: 40,
      });
      await rental.save();
      const token = new User().getAuthToken();
      await req
        .patch("/api/rentals/" + rental._id)
        .set("x-auth-token", token)
        .send({ dateIn: new Date() });
      rental = await Rental.findOne({ "movie.title": "movie40" });
      expect(rental.dateIn).not.toBeNull();
    });
    it("should send updated rental if data is valid", async () => {
      const genre50 = new Genre({ name: "genre50" });
      await genre50.save();
      const customer50 = new Customer({
        name: "customer50",
        phone: "125056789",
      });
      await customer50.save();
      const movie50 = new Movie({
        title: "movie50",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre50.name, _id: genre50._id },
      });
      await movie50.save();
      let rental = new Rental({
        customer: {
          name: customer50.name,
          phone: customer50.phone,
          _id: customer50._id,
        },
        movie: {
          title: movie50.title,
          dailyRentalRate: movie50.dailyRentalRate,
          _id: movie50._id,
        },
        rentalFee: 50,
      });
      await rental.save();
      const token = new User().getAuthToken();
      const res = await req
        .patch("/api/rentals/" + rental._id)
        .set("x-auth-token", token)
        .send({ dateIn: new Date() });
      expect(res.body.dateIn).not.toBeNull();
    });
    it("should increment numberInStock of chosen movie by 1 data is valid", async () => {
      const genre55 = new Genre({ name: "genre55" });
      await genre55.save();
      const customer55 = new Customer({
        name: "customer55",
        phone: "125556789",
      });
      await customer55.save();
      let movie55 = new Movie({
        title: "movie55",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre55.name, _id: genre55._id },
      });
      await movie55.save();
      let rental = new Rental({
        customer: {
          name: customer55.name,
          phone: customer55.phone,
          _id: customer55._id,
        },
        movie: {
          title: movie55.title,
          dailyRentalRate: movie55.dailyRentalRate,
          _id: movie55._id,
        },
        rentalFee: 55,
      });
      await rental.save();
      const token = new User().getAuthToken();
      await req
        .patch("/api/rentals/" + rental._id)
        .set("x-auth-token", token)
        .send({ dateIn: new Date() });
      movie55 = await Movie.findById(movie55._id);
      expect(movie55.numberInStock).toBe(11);
    });
  });
  describe("/:id delte", () => {
    it("should return 401 if token is not provided", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await req.delete("/api/rentals/" + id);
      expect(res.status).toBe(401);
    });
    it("should return 403 if logged in user is not an admin is not provided", async () => {
      const id = new mongoose.Types.ObjectId();
      const token = new User().getAuthToken();
      const res = await req
        .delete("/api/rentals/" + id)
        .set("x-auth-token", token);
      expect(res.status).toBe(403);
    });
    it("should return 404 if invalid id is send", async () => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const res = await req.delete("/api/rentals/1").set("x-auth-token", token);
      expect(res.status).toBe(400);
    });
    it("should delete rental if data is valid", async () => {
      const genre60 = new Genre({ name: "genre60" });
      await genre60.save();
      const customer60 = new Customer({
        name: "customer60",
        phone: "126056789",
      });
      await customer60.save();
      const movie60 = new Movie({
        title: "movie60",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre60.name, _id: genre60._id },
      });
      await movie60.save();
      let rental = new Rental({
        customer: {
          name: customer60.name,
          phone: customer60.phone,
          _id: customer60._id,
        },
        movie: {
          title: movie60.title,
          dailyRentalRate: movie60.dailyRentalRate,
          _id: movie60._id,
        },
        rentalFee: 60,
      });
      await rental.save();
      const token = new User({
        _id: new mongoose.Types.ObjectId(),
        isAdmin: true,
      }).getAuthToken();
      await req.delete("/api/rentals/" + rental._id).set("x-auth-token", token);
      rental = await Rental.findById(rental._id);
      expect(rental).toBeNull();
    });
    it("should send deleted rental if data is valid", async () => {
      const genre65 = new Genre({ name: "genre65" });
      await genre65.save();
      const customer65 = new Customer({
        name: "customer65",
        phone: "126556789",
      });
      await customer65.save();
      const movie65 = new Movie({
        title: "movie65",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre65.name, _id: genre65._id },
      });
      await movie65.save();
      let rental = new Rental({
        customer: {
          name: customer65.name,
          phone: customer65.phone,
          _id: customer65._id,
        },
        movie: {
          title: movie65.title,
          dailyRentalRate: movie65.dailyRentalRate,
          _id: movie65._id,
        },
        rentalFee: 65,
      });
      await rental.save();
      const token = new User({
        _id: new mongoose.Types.ObjectId(),
        isAdmin: true,
      }).getAuthToken();
      const res = await req
        .delete("/api/rentals/" + rental._id)
        .set("x-auth-token", token);
      expect(res.body.movie.title).toMatch("movie65");
    });
    it("should increment numberInStock of chosen movie by 1 data is valid", async () => {
      const genre70 = new Genre({ name: "genre70" });
      await genre70.save();
      const customer70 = new Customer({
        name: "customer70",
        phone: "127056789",
      });
      await customer70.save();
      let movie70 = new Movie({
        title: "movie70",
        dailyRentalRate: 1.1,
        numberInStock: 10,
        genre: { name: genre70.name, _id: genre70._id },
      });
      await movie70.save();
      let rental = new Rental({
        customer: {
          name: customer70.name,
          phone: customer70.phone,
          _id: customer70._id,
        },
        movie: {
          title: movie70.title,
          dailyRentalRate: movie70.dailyRentalRate,
          _id: movie70._id,
        },
        rentalFee: 70,
      });
      await rental.save();
      const token = new User({
        _id: new mongoose.Types.ObjectId(),
        isAdmin: true,
      }).getAuthToken();
      await req.delete("/api/rentals/" + rental._id).set("x-auth-token", token);
      movie70 = await Movie.findById(movie70._id);
      expect(movie70.numberInStock).toBe(11);
    });
  });
});
