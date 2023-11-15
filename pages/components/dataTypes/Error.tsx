import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/Object.module.css";

const Error = ({ data }) => {
  let error = data[0].value;
  return (
    <span>
      <span>
        {error.name}: {error.message}
      </span>
      {error.stack.split("\n").map((line, i) => {
        if (i === 0) {
          console.log("error first line", `'${line}'`);
          return;
        }
        return <div key={i}>&nbsp;&nbsp;{line}</div>;
      })}
    </span>
  );
};

export default Error;
