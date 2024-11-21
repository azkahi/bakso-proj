import User, { ListUsers, RoleTypes } from "../entity/User"
import UserRepository from "../repository/UserRepository"

export default class UserMapManager {
    // Repository can only be assigned once
    private readonly userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    getListSeller(): Promise<ListUsers> {
        return this.userRepo.getListSeller();
    }


    getListCustomer(): Promise<ListUsers> {
        return this.userRepo.getListCustomer();
    }

    getListUsers(): Promise<ListUsers> {
        const isSeller = this.getRole() == RoleTypes.Seller

        if (isSeller) {
            return this.userRepo.getListCustomer();
        } else {
            return this.userRepo.getListSeller();
        }
    }

    getRole(): string {
        return this.userRepo.getRole();
    }

    updateLocation(id: string, gps_x: number, gps_y: number): Promise<string> {
        return this.userRepo.updateLocation(id, gps_x, gps_y)
    }
}
