import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LodingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  // เมือโหลด component ทำงาน useEffect ด้วย
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000); //ลบทุก1วิ
    // นับถอยหลังแล้ว Redirect ไป home
    count === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <h1>No Permission, redirect in {count}</h1>
    </div>
  );
};

export default LodingToRedirect;
