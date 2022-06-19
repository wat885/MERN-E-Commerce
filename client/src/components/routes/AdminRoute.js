import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LodingToRedirect from "./LodingToRedirect";
import { currentAdmin } from "../functions/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  //            useSelector เข้าถึง redux        copy state จาก backend
  const [ok, setOk] = useState(false);

  useEffect(() => {

    // มีใน store ไหม
    if (user && user.token) {
      currentAdmin(user.token)
      .then(res=>{
        //res
        console.log(res)
        setOk(true)
        
      }).catch(err=>{
        //
        console.log(err)
        setOk(false)
      })
    }
  }, [user]);

  //
  return ok ? children : <LodingToRedirect />;
};

export default AdminRoute;
