import { useState, useEffect } from "react";

const Test = ({ num, ...props }) => {
  console.log(props);
  const [num2, setNum2] = useState(0);

  useEffect(() => {
    setNum2(num * 2);
    console.log(num, num2);
  }, [num, num2]);
  return (
    <div>
      <h1>{num}</h1>
      <h1>{num2}</h1>
    </div>
  );
};

export default Test;
