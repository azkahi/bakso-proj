import UserRepository from "../../core/repository/UserRepository";
import UserRepositoryInMemory from "../../infrastructure/repositories/UserRepositoryInMemory";
import User, { ListUsers } from "../../core/entity/User";
import { getIO } from "../../infrastructure/webserver/socket";
import UserManager from "../../core/usecase/UserManagement";
import UserMapManager from "../../core/usecase/UserMapManager";

class UsersController {
    private static instance: UsersController;
    private repo: UserRepository;
    private useCase: UserManager;
    private useCaseMap: UserMapManager;
    private lastEmittedCustomers: string = '';
    private lastEmittedSellers: string = '';

    constructor() {
        this.repo = new UserRepositoryInMemory();
        this.useCase = new UserManager(this.repo);
        this.useCaseMap = new UserMapManager(this.repo);
    }

    public static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }


    private validateParams(params: Record<string, any>, requiredParams: string[]): void {
        for (const param of requiredParams) {
            if (params[param] === undefined || params[param] === null) {
                throw new Error(`Missing required parameter: ${param}`);
            }
        }
    }

    private handleError(operation: string, error: any): string {
        console.error(`Error in ${operation}:`, error);
        return error instanceof Error ? error.message : 'An unexpected error occurred';
    }

    private async emitUserListChanges() {
        const io = getIO();
        const customers = await this.getListCustomer();
        const sellers = await this.getListSeller();

        const customersJSON = JSON.stringify(customers);
        const sellersJSON = JSON.stringify(sellers);

        if (customersJSON !== this.lastEmittedCustomers) {
            io.emit('customerListUpdate', customers);
            this.lastEmittedCustomers = customersJSON;
        }

        if (sellersJSON !== this.lastEmittedSellers) {
            io.emit('sellerListUpdate', sellers);
            this.lastEmittedSellers = sellersJSON;
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            return await this.repo.getUserById(id);
        } catch (e) {
            throw new Error(this.handleError('getUserById', e));
        }
    }

    public async createUser(name: string, role: string, gps_x?: number, gps_y?: number): Promise<string> {
        try {
            this.validateParams({ name, role }, ['name', 'role']);
            const result = await this.useCase.loginUser(name, role, gps_x, gps_y);
            this.emitUserListChanges();
            return result;
        } catch (e) {
            return this.handleError('createUser', e);
        }
    }

    public async deleteUser(id: string): Promise<string> {
        try {
            this.validateParams({ id }, ['id']);
            const result = await this.useCase.logoutUser(id);
            this.emitUserListChanges();
            return result;
        } catch (e) {
            return this.handleError('deleteUser', e);
        }
    }

    public async changeRole(id: string, role: string): Promise<string> {
        try {
            this.validateParams({ id, role }, ['id', 'role']);
            const result = await this.useCase.updateRole(id, role);
            this.emitUserListChanges();
            return result;
        } catch (e) {
            return this.handleError('changeRole', e);
        }
    }

    public async updateLocation(id: string, gps_x: number, gps_y: number): Promise<string> {
        try {
            this.validateParams({ id, gps_x, gps_y }, ['id', 'gps_x', 'gps_y']);
            const result = await this.useCaseMap.updateLocation(id, gps_x, gps_y);
            this.emitUserListChanges();
            return result;
        } catch (e) {
            return this.handleError('updateLocation', e);
        }
    }

    public async getListSeller(): Promise<ListUsers> {
        try {
            return await this.useCaseMap.getListSeller();
        } catch (e) {
            throw new Error(this.handleError('getListSeller', e));
        }
    }

    public async getListCustomer(): Promise<ListUsers> {
        try {
            return await this.useCaseMap.getListCustomer();
        } catch (e) {
            throw new Error(this.handleError('getListCustomer', e));
        }
    }
}

export default UsersController;