export default class User {
  id: string
  name: string
  role: string
  gps_x_coordinate: number
  gps_y_coordinate: number


  constructor(id: string = '', name: string = '', role: string = '', gps_x: number = 0, gps_y: number = 0) {
    // Check if user is customer, then need to set initial location
    if (role == RoleTypes.Customer && (gps_x == null || gps_y == null)) throw new Error("Customer must set initial location")
    
    this.id = id
    this.name = name
    this.role = role
    this.gps_x_coordinate = gps_x
    this.gps_y_coordinate = gps_y
  }

  updateCoordinate(gps_x: number, gps_y: number) {
    if (this.role == RoleTypes. Customer) {
      throw new Error("Customer cannot change location")
    } else {
      this.gps_x_coordinate = gps_x
      this.gps_y_coordinate = gps_y
    }
  }

  changeRole(role: string) {
    if (this.isRoleValid(role)) {
      this.role = role
    } else {
      throw new Error("Invalid role")
    }
  }

  isRoleValid(role: string) {
    // Check if role is member of enum
    return (<any>Object).values(RoleTypes).includes(role)
  }
}

export enum RoleTypes {
  Customer = 'customer',
  Seller = 'seller',
}

export interface ListUsers {
  [key: string]: User
}

export interface UserResponse {
  message: string
  token: string
}