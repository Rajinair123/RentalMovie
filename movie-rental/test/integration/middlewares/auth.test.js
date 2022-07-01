const { iteratee } = require('lodash');
const supertest = require('supertest');
const app = require('../../../index');
const req = supertest(app);
const {Genre}  =require('../../../models/genreModel');
const {User} = require('../../../models/userModel')
describe("auth middlewares",()=>{
     afterEach(async ()=>{
         await Genre.deleteMany({});
     });
    it('should return 401 if no token is sent',async()=>{
        const res = await req.post('/api/genres');
        expect(res.status).toBe(401);
    });
    it('should return 400 if invalid token is sent',async()=>{
        const res = await  req.post('/api/genres').set("x-auth-token","a");
        expect(res.status).toBe(400);
    })
    it('should return 200 if valid token is sent',async()=>{
       const token = User().getAuthToken();
       const res = await req
       .post("/api/genres")
       .set("x-auth-token",token)
       .send({name: "genre1"});
       expect(res.status).toBe(200);
    })
})