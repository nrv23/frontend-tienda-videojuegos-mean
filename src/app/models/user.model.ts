export class User {

    public id?: number;
    public name: string;
    public lastName: string;
    public email: string;
    public password:string;
    public confirm_password:string;
    public role?:string = "CLIENT";
    public birthDate? :string;
    public active? :boolean = false;


    constructor( name: string, lastName: string, email: string, password: string, role?:string, birthDate?: string,confirm_password?: string,id: number = null, active: boolean = false  ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.birthDate = birthDate;
        this.confirm_password = confirm_password;
        this.active = active;
    }
}