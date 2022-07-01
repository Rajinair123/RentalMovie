const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../../index');
const req = supertest(app);
const {User} = require('../../../models/userModel');
const {Customer} = require('../../../models/customerModel');


describe('/api/customers',()=>{
afterEach(async()=>{
    await Customer.deleteMany({});

});
describe('GET /',()=>{
    it('should return all customers ', async() => {
        await Customer.collection.insertMany([
            {name:"Rajashree"},
            {phoneNo:"1234567897"}
           ]);
       const res = await req.get('/api/customers');
       expect(res.status).toBe(200);
       expect(res.body.length).toBe(2);
       expect(res.body.some(c=>c.name =='Rajashree')).toBeTruthy();
       expect(res.body.some(c=>c.phoneNo =='1234567897')).toBeTruthy();

 });
   it('should return  404 customers is not found', async() => {
      const res = await req.get('/api/customers');
      expect(res.status).toBe(404)
       
   });
    });

  describe('GET /:id',()=>{
      it('should return 400 if invalid id is passed', async() => {
        const res =  await req.get('/api/customers/1');
        expect(res.status).toBe(400);
          
      });

    it('should return 404 if id is passed but customers not found', async() => {
        const id = new mongoose.Types.ObjectId()
        const res = await req.get('/api/customers'+ id);
        expect(res.status).toBe(404);
        
    });


    it('should return  200 customers when valid id is passed',async ()=>{
        const customer = new Customer({
           name:'Rajashree',
           phoneNo:"1234567876"
        });
        await customer.save();
        const res = await req.get('/api/customers/'+customer._id)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id",customer._id.toHexString());
        expect(res.body).toHaveProperty("name",customer.name);
        expect(res.body).toHaveProperty("phoneNo",customer.phoneNo);
    });
  });

  describe('POST /',()=>{
      it('should return 401 if token is not provided', async() => {
        const res = await req.post("/api/customers");
        expect(res.status).toBe(401);
    });

    it('should return 400 if customer name is less than 3 chaeactor',async ()=>{
   const user = new User();
   const token = user.getAuthToken();
   const res = await req
   .post("/api/customers")
   .set("x-auth-token",token)
    .send({ name: "rajashree",
    phoneNo: "1234567654"});
    expect (res.status).toBe(400);
    })   
    it('should return 400 if max phone length is more than 10 charactor',async ()=>{
        const user = new User();
        const token = user.getAuthToken();
        const res = await req
        .post("/api/customers")
        .set("x-auth-token",token)
         .send({ name: "rajashree",
        phoneNo:1234567654,
        isGold:"true"});
         expect (res.status).toBe(400);
         });
         it("should return 200 if customer saved successfully", async () => {
            const user = new User();
            const token = user.getAuthToken();
            const res = await req
              .post("/api/customers")
              .set("x-auth-token", token)
              .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
            expect(res.body).toHaveProperty("name", "rajashree");
            expect(res.body).toHaveProperty("phoneNo", "1234567654");
          });
          it('should return the customers',async()=>{
            const user = new User();
            const token = user.getAuthToken();
           const res =await req
           .post('/api/customers')
           .set('x-auth-token',token)
           .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
           expect(res.body).toHaveProperty("name", "rajashree");
           expect(res.body).toHaveProperty("phoneNo", "1234567654");
        }) ;
    });

  describe('PUT /:id',()=>{
    it("should return 400 if invalid id is passed", async () => {
        const res = await req.put("/api/customers/1");
        expect(res.status).toBe(400);
      });
      it('should return 400 if customer name is less than 3 chaeactor',async ()=>{
        const user = new User();
        const token = user.getAuthToken();
        const res = await req
        .post("/api/customers")
        .set("x-auth-token",token)
         .send({ name: "raj",
         phoneNo: "1234567654"});
         expect (res.status).toBe(400);     
         })   
         it('should return 400 if max phone length is more than 10 charactor',async ()=>{
             const user = new User();
             const token = user.getAuthToken();
             const res = await req
             .post("/api/customers")
             .set("x-auth-token",token)
              .send({ name: "rajashree",
             phoneNo:12345676541,
             isGold:"true"});
              expect (res.status).toBe(400);
              });
              it("should return 200 if put data successfull", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const customer= new Customer({
                  name: "rajashree",
                  phoneNo:"1234567897",
                  isGold:"true"
                });
                await customer.save();
                const res = await req
                  .put("/api/customers/" + customer._id)
                  .set("x-auth-token", token)
                  .send({ name: "rajashree",phoneNo:"123456789",
                  isGold:"true"});
                expect(res.status).toBe(200);
              });
              it("should return 200 if customer saved successfully", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const res = await req
                  .post("/api/customers")
                  .set("x-auth-token", token)
                  .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
                expect(res.body).toHaveProperty("name", "rajashree");
                expect(res.body).toHaveProperty("phoneNo", "1234567654");
              });
              it('should return the customers',async()=>{
                const user = new User();
                const token = user.getAuthToken();
               const res =await req
               .post('/api/customers')
               .set('x-auth-token',token)
               .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
               expect(res.body).toHaveProperty("name", "rajashree");
               expect(res.body).toHaveProperty("phoneNo", "1234567654");
            }) ;
  })
  describe("DELETE /:id", () => {
    it("should return admin", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const customer = new Customer({
        name: "rajashree", 
        phoneNo: "1234567654", 
        isGold: true ,
      });
      await customer.save();
      const res = await req
        .delete("/api/customers/" + customer._id)
        .set("x-auth-token", token);
      expect(res.status).toBe(403);
    });
    //invalid id passed
    it("should return 400 if invalid id is passed", async () => {
      const res = await req.delete("/api/customers/1");
      expect(res.status).toBe(400);
    });
    it("should return 404 objectid does not exist (customers not found)", async () => {
      const user = new User({
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const res = await req
        .delete("/api/customers/620cdb6debd0ca9a052419cb")
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    //valid id passed but genre not found
    it("should return 404 if  valid id passed with correct format but customers not found", async () => {
      const user = new User({
        isAdmin: true,
      });
      const token = user.getAuthToken();
      const id = new mongoose.Types.ObjectId();
      const res = await req
        .delete("/api/customers/" + id)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
    //invalid token passed
    it("should return  400 if token is invalid", async () => {
      const res = await req.delete("/api/customers/1").set("x-auth-token", "a");
      expect(res.status).toBe(400);
    });

    it("should return 200 if customer saved successfully", async () => {
      const user = new User();
      const token = user.getAuthToken();
      const res = await req
        .post("/api/customers")
        .set("x-auth-token", token)
        .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
      expect(res.body).toHaveProperty("name", "rajashree");
      expect(res.body).toHaveProperty("phoneNo", "1234567654");
    });
    it('should return the customers',async()=>{
      const user = new User();
      const token = user.getAuthToken();
     const res =await req
     .post('/api/customers')
     .set('x-auth-token',token)
     .send({ name: "rajashree", phoneNo: "1234567654", isGold: true });
     expect(res.body).toHaveProperty("name", "rajashree");
     expect(res.body).toHaveProperty("phoneNo", "1234567654");
  }) ;
    
  })


})
 