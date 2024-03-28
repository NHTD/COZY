const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    DETAIL_COURSE_CID: ':cid/:course_name',
    RESET_PASSWORD: 'reset-password/:token',
    
    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USERS: 'manage-users',
    MANAGE_COURSES: 'manage-courses',
    MANAGE_ROOMS: 'manage-rooms',
    MANAGE_SCHEDULES: 'manage-schedules',

    //Teacher
    TEACHER: 'teacher',

    //MEMBER
    MEMBER: 'member',
    PERSONAL: 'personal'
}

export default path;