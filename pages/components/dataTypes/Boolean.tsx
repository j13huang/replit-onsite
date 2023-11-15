import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/Boolean.module.css";

const Boolean = ({ data }) => {
  const value = data[0].value;
  return <span className={styles.boolean}>{value.toString()}</span>;
};

export default Boolean;
