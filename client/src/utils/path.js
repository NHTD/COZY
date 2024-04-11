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
    CREATE_COURSES: 'create-courses',
    MANAGE_ROOMS: 'manage-rooms',
    CREATE_ROOMS: 'create-rooms/:cid',
    MANAGE_SCHEDULES: 'manage-schedules',
    CREATE_SCHEDULES: 'create-schedules',
    ROOMS_INFORMATION: 'rooms-information/:rid',
    CREATE_ASSIGNMENT: 'create-assignment',
    ASSIGNMENT_INFORMATION: 'assignment-information/:rid',

    //Teacher
    TEACHER: 'teacher',

    //MEMBER
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_COURSE: 'my_course',
    MY_SCHEDULE: 'my-schedule/:rid',
    MY_ASSIGNMENT: 'my-assignment',
    MY_ROOMS: 'my-rooms',
    MY_SUBMIT: 'my-submit/:aid'
}

export default path;