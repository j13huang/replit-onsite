import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/Number.module.css";

const Number = ({ data }) => {
  const value = data[0].value;
  return <span className={styles.number}>{value}</span>;
};

export default Number;
