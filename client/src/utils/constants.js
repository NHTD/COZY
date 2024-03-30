import path from "./path"
import { AiOutlineDashboard } from "react-icons/ai";
import { MdGroup } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";

export const adminSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <AiOutlineDashboard/>
    },
    {
        id: 2,
        type: 'single',
        text: 'Manage users',
        path: `/${path.ADMIN}/${path.MANAGE_USERS}`,
        icon: <MdGroup/>
    },
    {
        id: 3,
        type: 'parent',
        text: 'Manage users',
        icon: <FaBook/>,
        submenu:[
            {
                text: 'Manage courses',
                path: `/${path.ADMIN}/${path.MANAGE_COURSES}`
            },
            {
                text: 'Create courses',
                path: `/${path.ADMIN}/${path.CREATE_COURSES}`
            }
        ]
    },
    {
        id: 4,
        type: 'single',
        text: 'Manage schedules',
        path: `/${path.ADMIN}/${path.MANAGE_SCHEDULES}`,
        icon: <GrSchedules/>
    },
]

export const roles = [
    {
        code: 1,
        value: 'Admin'
    },
    {
        code: 2,
        value: 'Teacher'
    },
    {
        code: 3,
        value: 'User'
    }
]