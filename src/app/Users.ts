export class Users

{
      photo : any;
      firstname : any;
      lastname: any;
      email:any;
      age: any;
      state: any;
      country: any;
      address: any;
      tags:any;
      id:any;

      constructor(photo:any,firstname:any, lastname:any, email:any, age:any, state:any, country:any, address:any, tags:any, id:any){
        this.id = id;
        this.photo = photo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.state = state;
        this.country = country;
        this.address = address;
        this.tags = tags;

      }
}


