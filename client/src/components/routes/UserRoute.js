import React from 'react'
import {useSelector} from 'react-redux'
import LodingToRedirect from './LodingToRedirect'



const UserRoute = ({children}) => {
    const {user} = useSelector((state) => ({...state}))
    //            useSelector เข้าถึง redux        copy state
    console.log('userRoute',user)

    // 
  return user && user.token 
  ? children
  : <LodingToRedirect />

//   <UserRoute>
//      <HomeUser/>  <<<< children คือตัวที่อยู่ข้างใน userRoute
//   </UserRoute>
}

export default UserRoute