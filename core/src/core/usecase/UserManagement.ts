import User from "../entity/User"
import UserRepository from "../repository/UserRepository"

export default class UserManager {
    // Repository can only be assigned once
    private readonly userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    loginUser(name: string, role: string, gps_x?: number, gps_y?: number): Promise<string> {
        return this.userRepo.createUser(name, role, gps_x, gps_y)
    }

    logoutUser(id: string): Promise<string> {
        return this.userRepo.deleteUser(id)
    }

    updateRole(id: string, role: string): Promise<string> {
        return this.userRepo.changeRole(id, role)
    }
}
