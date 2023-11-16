import { useEffect, useState, useCallback, useRef } from "react";
import SessionPicker from "./SessionPicker";
import autosize from "autosize";
import Result from "./Result";
import styles from "../../../styles/Console.module.css";

const Console = () => {
  let [sessionID, setSessionID] = useState("myuniquecontextid");
  let [codeInput, setCodeInput] = useState("");
  let [inputHistory, setInputHistory] = useState([]);
  let [inputHistoryIndex, setInputHistoryIndex] = useState(0);
  let [result, setResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  let fetchResult = useCallback(
    async (code) => {
      let json;
      console.log(JSON.stringify(code), sessionID);
      try {
        let result = await fetch("https://flatval.util.repl.co", {
          method: "POST",
          body: JSON.stringify({
            code: code.trim(),
            contextId: sessionID,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!result.ok) {
          console.log("statustext", result.statusText);
          setErrorMessage(await result.text());
          setResult(null);
          return;
        }
        json = await result.json();
      } catch (e) {
        console.log(typeof e, e);
        setErrorMessage(e);
        setResult(null);
        return;
      }

      console.log("received valid result", json);
      setResult(json.result);
      setErrorMessage("");
    },
    [sessionID, setResult, setErrorMessage]
  );

  useEffect(() => {
    autosize(inputRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.codingContainer}>
        <SessionPicker
          selectedSessionID={sessionID}
          onSessionSelected={(sessionID) => {
            setSessionID(sessionID);
          }}
        />
        <textarea
          className={styles.textarea}
          ref={inputRef}
          onChange={(e) => {
            setCodeInput(e.target.value);
          }}
          onKeyDown={(e) => {
            let lines = codeInput.split("\n");
            let firstLineLength = lines[0].length;
            let lastLineLength = lines.slice(0, -1).join("\n").length;
            /*
            console.log(
              e.key,
              firstLineLength,
              lastLineLength,
              inputRef.current.selectionStart,
              inputRef.current.selectionEnd
            );
            */

            if (
              e.key === "ArrowUp" &&
              inputRef.current.selectionStart <= firstLineLength &&
              inputHistoryIndex > 0
            ) {
              // moving up past the first time
              setCodeInput(inputHistory[inputHistoryIndex - 1]);
              setInputHistoryIndex(inputHistoryIndex - 1);
              console.log(
                "moving up",
                e.key,
                inputRef.current.selectionStart,
                firstLineLength
              );
              return;
            }

            if (
              e.key === "ArrowDown" &&
              inputRef.current.selectionEnd >= lastLineLength &&
              inputHistoryIndex < inputHistory.length - 1
            ) {
              // moving down past the bottom line
              setCodeInput(inputHistory[inputHistoryIndex + 1]);
              setInputHistoryIndex(inputHistoryIndex + 1);
              console.log(
                "moving down",
                e.key,
                inputRef.current.selectionEnd,
                lastLineLength
              );
              return;
            }
          }}
          value={codeInput}
        ></textarea>
        <div>
          <button
            onClick={() => {
              setInputHistory([...inputHistory, codeInput]);
              setInputHistoryIndex(inputHistory.length);
              fetchResult(codeInput);
            }}
          >
            submit
          </button>
        </div>
      </div>

      {result ? (
        <div className={styles.resultContainer}>
          <div>json result from Console.tsx: {JSON.stringify(result)}</div>
          <div>
            <Result data={result[0]} referenceData={result} isRoot />
          </div>
        </div>
      ) : null}
      {errorMessage && (
        <div className={styles.errorContainer}>
          {JSON.stringify(errorMessage)}
        </div>
      )}
    </div>
  );
};

export default Console;
