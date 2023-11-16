import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/String.module.css";

const String = ({ data }) => {
  const value = data.value;
  //console.log("string", data);
  return <span className={styles.string}>"{value}"</span>;
};

export default String;
