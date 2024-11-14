import User, { RoleTypes, ListUsers } from "../../core/entity/User"
import UserRepository from "../../core/repository/UserRepository"

import { v4 } from 'uuid';

export default class UserRepositoryInMemory implements UserRepository {
  private ListUsers:ListUsers =  {}

  public async createUser(name: string, role: string, gps_x?: number, gps_y?: number): Promise<string> {
    const id = v4()

    try {
      const newUser = new User(id, name, role, gps_x, gps_y)
      this.ListUsers[id] = newUser

      return 'User created successfully'
    } catch (e) {
      return e.message
    }
  }

  public async deleteUser(id: string): Promise<string> {
    try {
      delete this.ListUsers[id]
      return 'User deleted successfully'
    } catch {
      return 'An error has occurred'
    }
  }

  public async changeRole(id: string, role: string): Promise<string> {
    try {
      this.ListUsers[id].changeRole(role)
      return 'User changed role successfully'
    } catch {
      return 'An error has occurred'
    }
  }

  public async updateLocation(id: string, gps_x: number, gps_y: number): Promise<string> {
    try {
      this.ListUsers[id].updateCoordinate(gps_x, gps_y)
      return 'User\'s location updated successfully'
    } catch {
      return 'An error has occurred'
    }
  }

  private getListUsers(isSeller: boolean) {
    const roleType = isSeller ? RoleTypes.Seller : RoleTypes.Customer

    const ListSellers:ListUsers = {}

    for (const id in this.ListUsers) {
      const currentUser = this.ListUsers[id]
      if (currentUser.role == roleType) {
        ListSellers[id] = currentUser
      }
    }

    return ListSellers
  }

  public async getListSeller(): Promise<ListUsers> {
    return this.getListUsers(true)
  }

  public async getListCustomer(): Promise<ListUsers> {
    return this.getListUsers(true)
  }
}
