import { useState } from "react"
import { Marker } from "@react-google-maps/api";
import { Navigate } from 'react-router-dom';

import UserRepository from '../../../core/repository/UserRepository';
import UserMapManager from "../../../core/usecase/UserMapManager"
import UserManager from '../../../core/usecase/UserManagement';
import User, { ListUsers } from '../../../core/entity/User';
import socketWrapper from "../../../infrastructure/utils/Socket";

export default function HomeViewModel(userRepository: UserRepository) {
    const userMapManager = new UserMapManager(userRepository)
    const userManager = new UserManager(userRepository)
    const [listUsers, updateListUsers] = useState<{ [key: string]: User }>({});
    const [map, setMap] = useState(null)
    
    async function init() {
        await socketWrapper.connect()
        socketWrapper.on('customerListUpdate', getListUsers);
        socketWrapper.on('sellerListUpdate', getListUsers);
    }

    async function getListUsers() {
        const listUserResponse: ListUsers = await userMapManager.getListUsers()
        updateListUsers(listUserResponse)
    }

    function getRole() {
        return userMapManager.getRole()
    }

    function getMarkers() {
        const markers: User[] = []

        Object.keys(listUsers).forEach((key) => {
            const value: User = listUsers[key];
            markers.push(value)
        })

        return markers
    }

    function logout() {
        userManager.logoutUser()
        Navigate({ to: '/login', replace: true })
    }

    return {
        listUsers,
        getListUsers,
        getRole,
        map,
        setMap,
        getMarkers,
        init
    }
}