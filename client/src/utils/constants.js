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
        text: 'Courses',
        icon: <FaBook/>,
        submenu:[
            {
                text: 'Create courses',
                path: `/${path.ADMIN}/${path.CREATE_COURSES}`
            },
            {
                text: 'Manage courses',
                path: `/${path.ADMIN}/${path.MANAGE_COURSES}`
            }
        ]
    },
    {
        id: 4,
        type: 'parent',
        text: 'Schedules',
        icon: <GrSchedules/>,
        submenu: [
            {
                text: 'Manage schedules',
                path: `/${path.ADMIN}/${path.MANAGE_SCHEDULES}`
            },
            {
                text: 'Create schedules',
                path: `/${path.ADMIN}/${path.CREATE_SCHEDULES}`
            }
        ]
    },
    {
        id: 5,
        type: 'parent',
        text: 'Rooms',
        icon: <GrSchedules/>,
        submenu: [
            {
                text: 'Rooms information',
                path: `/${path.ADMIN}/${path.COURSES_INFORMATION}`
            },
            // {
            //     text: 'Create rooms',
            //     path: `/${path.ADMIN}//${path.CREATE_ROOMS}`
            // },
            {
                text: 'Manage rooms',
                path: `/${path.ADMIN}/${path.MANAGE_ROOMS}`
            }
        ]
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

export const memberSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Personal',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <AiOutlineDashboard/>
    },
    {
        id: 2,
        type: 'single',
        text: 'My courses',
        path: `/${path.MEMBER}/${path.MY_COURSE}`,
        icon: <MdGroup/>
    },
    {
        id: 3,
        type: 'single',
        text: 'My schedule',
        path: `/${path.MEMBER}/${path.MY_SCHEDULE}`,
        icon: <FaBook/>,
    },
    {
        id: 4,
        type: 'single',
        text: 'My assignment',
        path: `/${path.MEMBER}/${path.MY_ASSIGNMENT}`,
        icon: <GrSchedules/>
    },
]

export const blockStatus = [
    {
        code: 0,
        value: 'Active'
    },
    {
        code: 1,
        value: 'Block'
    }
]