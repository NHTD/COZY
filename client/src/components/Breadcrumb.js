import React, { } from 'react'
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { IoIosArrowForward } from "react-icons/io";

const userNamesById = { 1: "John" };

// const DynamicUserBreadcrumb = ({ match }) => (
//   <span>{userNamesById[match.params.userId]}</span>
// );

const Breadcrumb = ({course_name}) => {
  
    const routes = [
      { path: "/:cid/:course_name", breadcrumb: course_name },
      { path: "/", breadcrumb: "Home" }
    ];
    const breadcrumbs = useBreadcrumbs(routes)
  return (
    <div className='flex items-center h-[27px] mb-[30px]'>
      {breadcrumbs?.filter(el => !el.match.route === false).map(({match, breadcrumb}, index, self) => (
        <Link className='flex items-center font-[500] text-[14px]' key={match.pathname} to={match.pathname}>
          <span className='hover:text-[#00ADEF]'>{breadcrumb}</span>
          {index !== self.length - 1 && <IoIosArrowForward/>}
        </Link>
      ))}
    </div>
  )
}

export default Breadcrumb