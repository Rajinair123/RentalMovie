const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../../index');
const req = supertest(app)
const {Genre} = require('../../../models/genreModel');
const {User} = require('../../../models/userModel');
const {Movie} = require('../../../models/movieModel')

describe('/api/movies',()=>{
    afterEach(async ()=>{
        await Movie.deleteMany({});
        await Genre.deleteMany({})

});
describe('GET /',()=>{

it('should return 404 not found movie', async() => {
     const res= await req.get("/api/movies");
     expect(res.status).toBe(404);
})


 it('should return all movies', async() => {
     const genre = new Genre({
         name:"horror",
     });
     await genre.save()
    const movie = new Movie({
         title :"the conjuring",
         genre :{
             _id: genre._id,
             name: genre.name,
         },
         numberInStock :10, 
         dailyRentalRate :2.1,
     });
     
     await movie.save();
     const res = await req.get('/api/movies');
     console.log(res.status);
     expect(res.status).toBe(200);
     
 }); 
})

describe('GET /:id',()=>{
    it('should return 400 if invalid id is passed', async() => {
       const res= await req.get("/api/movies")
       expect(res.status);
    });

    it("should return 404 if valid id is passed but movies not found",async()=>{
        const id = new mongoose.Types.ObjectId()
         const res = await req.get("/api/movies/" +id );
         expect(res.status).toBe(404);
     });
it("should return 200 if movie not found", async()=>{
    const genre = new Genre({
        name:"drama",
    });
    const movie = new Movie({
        title:"romeo",
        genre:{
            _id:genre._id,
            name:genre.name,
        },
        numberInStock:30,
        dailyRentalRate: 50,
    });
    await movie.save();
    const res = await req.get('/api/movies/' + movie._id);
     expect(res.status).toBe(200);
});

});

describe("POST /:id",()=>{
    if("should return 403 if token is not found",async()=>{
        const user = new User()
            const token = user.getAuthToken();
            const genre = new Genre({
                name :"Adventure",
            });
            await genre.save();
            const res = await req 
            .post('/api/movies')
            .set  ('x-Auth-Token', token)
            .send({
                title:"romeo",
                dailyRentalRate:2,
                numberInStock:100,
            });
        expect(res.status).toBe(400);
    
        });
 
      it('should return 400 if title is more than 255 char ', async() => {
          const user = new User();
          const token = user.getAuthToken();
          const genre = new Genre({
              name:"adventure",
          });
          await genre.save();
          const res = await req
          .post("/api/movies")
          .set  ('x-Auth-Token', token)
            .send({
                title:new Array(255).join("test"),
                genreId:genre._id,
                dailyRentalRate:2,
                numberInStock: 34,
            });
            expect(res.status).toBe(400);
          
      });  
      it('should save the movies',async()=>{
        const user = new User();
        const token = user.getAuthToken();
        const genre = new Genre({
            name:"adventure",
        });
        await genre.save();
        const res = await req
        .post("/api/movies")
        .set  ('x-Auth-Token', token)
          .send({
              title:new Array(255).join("test"),
              genreId:genre._id,
              dailyRentalRate:2,
              numberInStock: 34,
          });
          expect(res.body).toHaveProperty('title',"adventure")

      });

      it('should save the movies',async()=>{
        const user = new User();
        const token = user.getAuthToken();
        const genre = new Genre({
            name:"adventure",
        });
        await genre.save();
        const res = await req
        .post("/api/movies")
        .set  ('x-Auth-Token', token)
          .send({
              title:new Array(255).join("test"),
              genreId:genre._id,
              dailyRentalRate:2,
              numberInStock: 34,
          });
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('title',"adventure")

    })
})


})