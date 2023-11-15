import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import styles from "../../../styles/Array.module.css";
import Result from "../Console/Result";
import Number from "./Number";

type Props = {
  data: any;
  // when we are in a nested array, we want to show the key in between the triangle and the value,
  // so we have this keyPrefix to render it properly
  keyPrefix?: React.ReactNode;
  // show the array length in the same line instead of the shorthand representation if the array is expanded
  isRoot?: boolean;
};

const Array: React.FC<Props> = ({ data, keyPrefix, isRoot }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const entries = data[0].value;
  return (
    <div>
      <div className={styles.container}>
        <span
          className={styles.expandButton}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "▼" : "▶"}
        </span>
        &nbsp;
        {keyPrefix ? keyPrefix : null}
        {entries.length > 1 && (
          <>
            &nbsp;
            <span className={styles.nonRootHeaderLength}>
              ({entries.length})
            </span>
          </>
        )}
        &nbsp;
        {isRoot || !isExpanded ? (
          <>
            {"["}
            {entries.map((valueIndex, i) => {
              //console.log("array shorthand", data);
              return (
                <span key={i}>
                  <Result
                    data={{
                      ...data,
                      0: data[valueIndex],
                    }}
                    isShorthand
                    isRoot={false}
                  />
                  {i === entries.length - 1 ? "" : ", "}
                </span>
              );
            })}
            {"]"}
          </>
        ) : (
          <span>Array({entries.length})</span>
        )}
      </div>
      {isExpanded && (
        <div>
          {entries.map((valueIndex, i) => {
            let isNestedObject =
              data[valueIndex].type === "object" ||
              data[valueIndex].type === "array";
            return (
              <div key={i} className={styles.expandedEntry}>
                &nbsp;&nbsp;
                {!isNestedObject && (
                  <>
                    <span
                      className={clsx(styles.index, styles.primitiveSubkey)}
                    >
                      {i}:
                    </span>
                    &nbsp;
                  </>
                )}
                <div>
                  <Result
                    keyPrefix={
                      isNestedObject && (
                        <>
                          <span className={styles.index}>{i}:</span>
                        </>
                      )
                    }
                    data={{
                      ...data,
                      0: data[valueIndex],
                    }}
                    isRoot={false}
                  />
                </div>
              </div>
            );
          })}
          <div
            className={clsx(styles.expandedEntryLength, styles.primitiveSubkey)}
          >
            &nbsp;&nbsp;length:{" "}
            <Number data={{ 0: { value: entries.length } }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Array;
