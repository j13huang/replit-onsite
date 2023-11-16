import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import styles from "../../../styles/Object.module.css";
import Result from "../Console/Result";

type Props = {
  data: { [key: string]: any };
  referenceData: { [key: string]: any };
  // when we are in a nested object, we want to show the key in between the triangle and the value,
  // so we have this keyPrefix to render it properly
  keyPrefix?: React.ReactNode;
  // don't show the shorthand in the same line if object is expanded
  isRoot?: boolean;
};

const Object: React.FC<Props> = ({
  data,
  referenceData,
  keyPrefix,
  isRoot,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const entries = data.value;
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
                  <span className={styles.key}>
                    {referenceData[keyIndex].value}
                  </span>
                  :&nbsp;
                  <span>
                    <Result
                      data={referenceData[valueIndex]}
                      referenceData={referenceData}
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
              referenceData[valueIndex].type === "object" ||
              referenceData[valueIndex].type === "array";
            return (
              <div key={i} className={styles.expandedEntry}>
                &nbsp;&nbsp;
                {!isNestedObject && (
                  <>
                    <div className={clsx(styles.key, styles.primitiveSubkey)}>
                      {referenceData[keyIndex].value}
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
                            {referenceData[keyIndex].value}
                          </span>
                          :
                        </>
                      )
                    }
                    data={referenceData[valueIndex]}
                    referenceData={referenceData}
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
