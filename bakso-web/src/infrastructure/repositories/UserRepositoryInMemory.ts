import User, { RoleTypes, ListUsers } from "../../core/entity/User"
import UserRepository from "../../core/repository/UserRepository"
import apiPost from "../utils/Axios";

const CORE_URL = process.env.REACT_APP_CORE_URL;

export const SUCCESS_MESSAGE = 'Action completed successfully'
export const ERROR_MESSAGE = 'An error has occurred'

export default class UserRepositoryInMemory implements UserRepository {
  private ListUsers: ListUsers = {}
  private currentUser: User
  private static instance: UserRepositoryInMemory | null = null

  constructor() {
    this.currentUser = new User()
  }

  public static getInstance(): UserRepositoryInMemory {
    if (!UserRepositoryInMemory.instance) {
      UserRepositoryInMemory.instance = new UserRepositoryInMemory();
    }
    return UserRepositoryInMemory.instance;
  }

  public async createUser(name: string, role: string, gps_x?: number, gps_y?: number): Promise<string> {
    try {
      const response = await apiPost(`${CORE_URL}/users/create`, { name, role, gps_x, gps_y })
      this.currentUser.id = response.message
      this.currentUser.role = role
      return SUCCESS_MESSAGE
    } catch {
      return ERROR_MESSAGE
    }
  }

  public getRole() {
    return this.currentUser.role
  }

  public async deleteUser(): Promise<string> {
    try {
      const response = await apiPost(`${CORE_URL}/users/delete`, { id: this.currentUser.id })
      this.currentUser = new User()
      return SUCCESS_MESSAGE
    } catch {
      return ERROR_MESSAGE
    }
  }

  public async changeRole(id: string, role: string): Promise<string> {
    try {
      const response = await apiPost(`${CORE_URL}/users/change-role`, { id, role })
      return SUCCESS_MESSAGE
    } catch {
      return ERROR_MESSAGE
    }
  }

  public async updateLocation(id: string, gps_x: number, gps_y: number): Promise<string> {
    try {
      const response = await apiPost(`${CORE_URL}/users/update-location`, { id, gps_x, gps_y })
      return SUCCESS_MESSAGE
    } catch {
      return ERROR_MESSAGE
    }
  }

  public async getListUsersLocal() {
    return this.ListUsers
  }

  private async getListUsers(isSeller: boolean) {
    try {
      const roleType = isSeller ? RoleTypes.Seller : RoleTypes.Customer
      let listUsersResponse = {}

      if (isSeller) {
        listUsersResponse = await apiPost(`${CORE_URL}/users/list-customers`, {})
      } else {
        listUsersResponse = await apiPost(`${CORE_URL}/users/list-sellers`, {})
      }

      this.ListUsers = listUsersResponse

      return this.ListUsers
    } catch {
      throw new Error(ERROR_MESSAGE)
    }
  }

  public async getListSeller(): Promise<ListUsers> {
    return this.getListUsers(true)
  }

  public async getListCustomer(): Promise<ListUsers> {
    return this.getListUsers(true)
  }
}
