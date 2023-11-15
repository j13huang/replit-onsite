import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import styles from "../../../styles/Object.module.css";
import Result from "../Console/Result";

type Props = {
  data: any;
  // when we are in a nested object, we want to show the key in between the triangle and the value,
  // so we have this keyPrefix to render it properly
  keyPrefix?: React.ReactNode;
  // don't show the shorthand in the same line if object is expanded
  isRoot?: boolean;
};

const Object: React.FC<Props> = ({ data, keyPrefix, isRoot }) => {
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
        {isRoot || !isExpanded ? (
          <div>
            {"{"}
            {/*`${isRoot}`} {`${isExpanded}`*/}
            {entries.map(({ key: keyIndex, value: valueIndex }, i) => {
              return (
                <span key={i}>
                  <span className={styles.key}>{data[keyIndex].value}</span>
                  :&nbsp;
                  <span>
                    <Result
                      data={{
                        ...data,
                        0: data[valueIndex],
                      }}
                      isRoot={false}
                      isShorthand
                    />
                  </span>
                  {i === entries.length - 1 ? "" : ", "}
                </span>
              );
            })}
            {"}"}
          </div>
        ) : null}
      </div>
      {isExpanded && (
        <div>
          {entries.map(({ key: keyIndex, value: valueIndex }, i) => {
            //console.log(data[keyIndex]);
            let isNestedObject =
              data[valueIndex].type === "object" ||
              data[valueIndex].type === "array";
            return (
              <div key={i} className={styles.expandedEntry}>
                &nbsp;&nbsp;
                {!isNestedObject && (
                  <>
                    <div className={clsx(styles.key, styles.primitiveSubkey)}>
                      {data[keyIndex].value}
                    </div>
                    :&nbsp;
                  </>
                )}
                <div>
                  <Result
                    keyPrefix={
                      isNestedObject && (
                        <>
                          <span className={styles.key}>
                            {data[keyIndex].value}
                          </span>
                          :
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
                {/*<div>{JSON.stringify(valueIndex)}</div>*/}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Object;
