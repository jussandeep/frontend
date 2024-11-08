export class Employee {
	id: number = 0;
	firstName: string = '';
	lastName: string = '';
	age: number = 0;
	gender: string = '';
	email: string = '';
	phoneNumber: string = '';
	dob: Date = new Date();
	designation: string = '';
	technicalSkills: string[] = [];
	otherSkills:string='';
	active: boolean = true;
	experienced: boolean = false;
	experience: number = 0;
	state: string = '';
	salary: number = 0;
	address!: Address;
  }

  export class Address {
	street: string = '';
	city: string = '';
	state: string = '';
	zipCode: string = '';
	country:string=''

  }