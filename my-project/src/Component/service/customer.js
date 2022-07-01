export const customers = [
    {
      _id: "5k21ca3eeb7f6fbccd471818",
      name: "Ashutosh",
      phone: "9960663654",
      isGold: "true",
    },
    {
      _id: "5k21ca3eeb7f6fbccd471814",
      name: "Aditi",
      phone: "9960663655",
      isGold: false,
    },
    {
      _id: "5k21ca3eeb7f6fbccd471820",
      name: "Aishwarya",
      phone: "9960663656",
      isGold: false,
    },
  ];
  
  export function getCustomers() {
    return customers.filter((g) => g);
  }
  
  export function getCustomer(id) {
    return customers.find((m) => m._id === id);
  }
  
  
  export function saveCustomer(customer) {
    let customerInDb = customers.find((m) => m._id === customer._id) || {};
    customerInDb.name = customer.name;
    customerInDb.phone = customer.phone;
    customerInDb.isGold = customer.isGold;
    
  
    if (!customerInDb._id) {
      customerInDb._id = Date.now().toString();
      customers.push(customerInDb);
    }
  
    return customerInDb;
  }
  