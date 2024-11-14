import User, { ListUsers } from "../entity/User"

export default interface UserRepository {
  createUser(name: string, role: string, gps_x?: number, gps_y?: number): Promise<string>
  deleteUser(id: string): Promise<string>
  changeRole(id: string, role: string): Promise<string>
  updateLocation(id: string, gps_x: number, gps_y: number): Promise<string>
  getListSeller(): Promise<ListUsers>
  getListCustomer(): Promise<ListUsers>
}
