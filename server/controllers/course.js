const asyncHandler = require('express-async-handler')
const Course = require('../models/course')

const createCourse = asyncHandler(async (req, res) => {
    const {start_date, end_date, price, title, des, course_name} = req.body
    const image = req.file.path
    if(!start_date || !end_date || !price || !title || !des || !course_name){
        throw new Error('Missing inputs')
    }
    req.body.image = image
    
    const data = await Course.create(req.body)

    return res.status(200).json({
        status: data ? true : false,
        mes: data ? 'Create successful' : 'Can not create course'
    })
})

const getAllCourses = asyncHandler(async (req, res) => {
    // const response = await Course.find();

    // return res.status(200).json({
    //     status: response ? true : false,
    //     mes: response ? response : 'Can not get all courses. Something went wrong'
    // })
    const queries = {...req.query}
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    if(queries?.course_name){
        formatedQueries.course_name = {$regex: queries.course_name, $options: 'i'}
    }

    // const query = {}
    // if(req.query.q) {
    //     query = {$or: [
    //         {first_name: {$regex: queries.q, $options: 'i'}},
    //         {email: {$regex: queries.q, $options: 'i'}}
    //     ]}
    // }
    let queryObject = {}
    if(queries?.q) {
        delete formatedQueries.q
        queryObject = {
            $or: [
                {course_name: {$regex: queries.q, $options: 'i'}},
                {title: {$regex: queries.q, $options: 'i'}}
            ]
        }
    }


    let queryCommand = Course.find({...formatedQueries, ...queryObject})
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_USERS
    const skip = (page-1)*limit
    queryCommand.skip(skip).limit(limit)
    try {
        const response = await queryCommand.exec();
        
        if (!response) {
          return res.status(200).json({
            status: false,
            mes: 'Cannot get all courses',
            counts: 0
          });
        }
      
        const counts = await Course.countDocuments(formatedQueries);
        
        return res.status(200).json({
          status: true,
          mes: response ? response : 'Cannot get all courses',
          counts
        });
    } catch (err) {
        throw new Error(err.message);
    }      
})

const getCourse = asyncHandler(async (req, res) => {
    const {cid} = req.params
    const response = await Course.findById(cid);

    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Can not get all courses. Something went wrong'
    })
})

const updateCourse = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const file = req.file
    if(file){
        console.log(file.path)
        req.body.image = file?.path
    }

    const updateCourse = await Course.findByIdAndUpdate(cid, req.body, {new: true})
    return res.status(200).json({
        status: updateCourse ? true : false,
        mes: updateCourse ? 'Update Successful' : 'Cannot update course'
    })
})

const deleteCourse = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const deleteCourse = await Course.findByIdAndDelete(cid)
    return res.status(200).json({
        status: deleteCourse ? true : false,
        mes: deleteCourse ? 'Delete successful' : 'Cannot delete'
    })
}) 

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
}