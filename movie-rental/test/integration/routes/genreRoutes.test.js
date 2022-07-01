const mongoose = require('mongoose');
const supertest = require('supertest')
const app = require("../../../index");
const req = supertest(app);
const{User}= require("../../../models/userModel");
const {Genre} = require('../../../models/genreModel')
describe('/api/genres',()=>{
    afterEach(async ()=>{
        await Genre.deleteMany({});
    });
    describe('GET /',()=>{
        it("should return all genres",async ()=>{
         await Genre.collection.insertMany([
             {name:"genre1"},
             {name:"genre2"}
            ]);
        const res = await req.get('/api/genres');
        expect(res.status).toBe(200);
        //expect(res.body.length).toBe(2);
        expect(res.body.some(g=>g.name =='genre1')).toBeTruthy();
        expect(res.body.some(g=>g.name =='genre2')).toBeTruthy();

  });

  it('should return 404 if genre are not found',async()=>{
      const res = await req.get("/api/genres");
      expect(res.status).toBe(404);
  });

    });

describe("GET /:id",()=>{
    it("should return 400 if invalid id is passed",async()=>{
        const res = await req.get("/api/genres/1");
        expect(res.status).toBe(400);
    });
    it("should return 404 if valid id is passed but genre not found",async()=>{
       const id = new mongoose.Types.ObjectId()
        const res = await req.get("/api/genres/" +id );
        expect(res.status).toBe(404);
    });
    it('should return  200 genre when valid id is passed',async ()=>{
        const genre = new Genre({
           name:'genre1',
        });
        await genre.save();
        const res = await req.get('/api/genres/'+genre._id)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id",genre._id.toHexString());
        expect(res.body).toHaveProperty("name",genre.name);
    })
});


describe('POST /',()=>{
    it('should return 401 if token is not provided',async ()=>{
        const res = await req.post("/api/genres");
        expect(res.status).toBe(401);
    });
    it('should return 400 if genre name is less than 3 chaeactor',async ()=>{
   const user = new User();
   const token = user.getAuthToken();
   const res = await req
   .post("/api/genres")
   .set("x-auth-token",token)
    .send({ name: "g1"});
    expect (res.status).toBe(400);
    })   
    it('should return 400 if genre name is more than 50 chaeactor',async ()=>{
        const user = new User();
        const token = user.getAuthToken();
        const genreName = new Array(52).join("a");
        const res = await req
        .post("/api/genres")
        .set("x-auth-token",token)
         .send({ name: genreName});
         expect (res.status).toBe(400);
         });
         it('should save the genre',async()=>{
             const user = new User();
             const token = user.getAuthToken();
            await req
            .post('/api/genres')
            .set('x-auth-token',token)
            .send({name:"genre1"});
            const genre = await Genre.findOne({name:"genre1"});
            expect(genre).not.toBeNull();
            expect(genre).toHaveProperty("name","genre1");
         });
         it('should return the genre',async()=>{
            const user = new User();
            const token = user.getAuthToken();
           const res =await req
           .post('/api/genres')
           .set('x-auth-token',token)
           .send({name:"genre1"});
           expect(res.status).toBe(200);
           expect(res.body).toHaveProperty("name","genre1");
        }) ;
    });

        describe("PUT /:id", () => {
          it("should return 400 if invalid id is passed", async () => {
            const res = await req.put("/api/genres/1");
            expect(res.status).toBe(400);
          });
      
          it("should return 404 if  valid id passed with correct format but genre not found", async () => {
            const user = new User();
            const token = user.getAuthToken();
            const id = new mongoose.Types.ObjectId();
            const res = await req
              .put("/api/genres/" + id)
              .set("x-auth-token", token)
              .send({ name: "genre1" });
            expect(res.status).toBe(404);
          });
          
          it("should return  400 if token is invalid", async () => {
            const res = await req.put("/api/genres/1").set("x-auth-token", "a");
            expect(res.status).toBe(400);
          });
           it('should return 400 if genre name is more than 10 chaeactor',async ()=>{
                    const user = new User();
                    const token = user.getAuthToken();
                    const genre = new Genre({
                      name:"rajashree"
                    })
                    await genre.save();
                    const res = await req
                    .put("/api/genres/" + genre._id)
                    .set("x-auth-token",token)
                     .send({ name: "rajashreedfgfdfgsdfgssdfs"});
                     console.log(res.body);
                     expect (res.status).toBe(400);
                     });
          it("should return 200 if put data successfull", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const genre = new Genre({
        name: "genre1",
      });
      await genre.save();
      const res = await req
        .put("/api/genres/" + genre._id)
        .set("x-auth-token", token)
        .send({ name: "genre1" });
      expect(res.status).toBe(200);
    });
    it("should return put genre", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const genre = new Genre({
        name: "genre1",
      });
      await genre.save();
      const res = await req
        .put("/api/genres/" + genre._id)
        .set("x-auth-token", token)
        .send({ name: "genre2" });
      expect(res.body).toHaveProperty("name", "genre2");
   
  });
});



   describe("DELETE /:id", () => {
    it("should only handle admin", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const genre = new Genre({
        name: "genre1",
      });
      await genre.save();
      const res = await req
        .delete("/api/genres/" + genre._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(403);
    });
    //invalid id passed
    it("should return 400 if invalid id is passed", async () => {
      const res = await req.delete("/api/genres/1");
      expect(res.status).toBe(400);
    });
    it("should return 404 objectid does not exist (genre not found)", async () => {
      const user = new User({
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const res = await req
        .delete("/api/genres/6249a0c6a41379804de56599")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    //valid id passed but genre not found
    it("should return 404 if  valid id passed with correct format but genre not found", async () => {
      const user = new User({
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const id = new mongoose.Types.ObjectId();
      const res = await req
        .delete("/api/genres/" + id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    //invalid token passed
    it("should return  400 if token is invalid", async () => {
      const res = await req.delete("/api/genres/1").set("x-auth-token", "a");
      expect(res.status).toBe(400);
    });

    //200 status data updated and show
    it("should return the genre", async () => {
      const user = new User({
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const genre = new Genre({
        name: "genre12",
      });
      await genre.save();
      const res = await req
        .delete("/api/genres/" + genre._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
    //genre updated and find in db
    it("should return save the genre", async () => {
      const user = new User({ isAdmin: true });
      const token = user.getAuthToken();
      let genre = new Genre({
        name: "genre1",
      });
      await genre.save();
      const res = await req
        .delete("/api/genres/" + genre._id)
        .set("x-auth-token", token);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  })
});