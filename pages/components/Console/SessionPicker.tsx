import { useEffect, useState, useCallback, useRef } from "react";
import styles from "../../../styles/SessionPicker.module.css";

const SessionPicker = ({ selectedSessionID, onSessionSelected }) => {
  let [newSessionInput, setNewSessionInput] = useState("");
  let [options, setOptions] = useState([selectedSessionID]);

  return (
    <div className={styles.sessionContainer}>
      <label className={styles.sessionLabelContainer}>
        select session ID:
        <select
          value={selectedSessionID}
          onChange={(e) => {
            onSessionSelected(e.target.value);
          }}
        >
          {options.map((o, i) => {
            return (
              <option key={i} value={o}>
                {o}
              </option>
            );
          })}
        </select>
      </label>
      <div>
        <input
          placeholder={"new session"}
          onChange={(e) => {
            setNewSessionInput(e.target.value);
          }}
          value={newSessionInput}
        ></input>
        <button
          onClick={() => {
            if (newSessionInput === "") {
              return;
            }
            setOptions([...options, newSessionInput]);
            onSessionSelected(newSessionInput);
            setNewSessionInput("");
          }}
        >
          add new session
        </button>
      </div>
    </div>
  );
};

export default SessionPicker;
