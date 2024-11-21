import { useState } from "react"

import UserRepository from '../../../core/repository/UserRepository';
import UserManager from '../../../core/usecase/UserManagement';
import User, { ListUsers } from '../../../core/entity/User';

export default function HomeViewModel(userRepository: UserRepository) {
    const userManager = new UserManager(userRepository)
    
    const [gps_x, setGps_x] = useState(0)
    const [gps_y, setGps_y] = useState(0)

    const login = (name: string, role: string) => {
        userManager.loginUser(name, role, gps_x, gps_y)
    }

    const handleSubmit = (e: any) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        const formJson = Object.fromEntries(formData.entries());

        login(formJson.name as string, formJson.role as string)
      }

    return {
        gps_x,
        setGps_x,
        gps_y,
        setGps_y,
        login,
        handleSubmit
    }
}