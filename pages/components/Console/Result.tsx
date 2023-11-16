import Undefined from "../dataTypes/Undefined";
import Null from "../dataTypes/Null";
import Number from "../dataTypes/Number";
import Boolean from "../dataTypes/Boolean";
import String from "../dataTypes/String";
import Object from "../dataTypes/Object";
import Array from "../dataTypes/Array";
import Error from "../dataTypes/Error";

type Props = {
  data: { [key: string]: any };
  referenceData: { [key: string]: any };
  // when we are in a nested object, we want to show the key in between the triangle and the value,
  // so we have this keyPrefix to render it properly
  keyPrefix?: React.ReactNode;
  isRoot?: boolean;
  isShorthand?: boolean;
};

const Result: React.FC<Props> = ({
  data,
  referenceData,
  keyPrefix,
  isRoot,
  isShorthand,
}) => {
  //console.log("Result", data, referenceData);
  switch (data.type) {
    case "undefined":
      return <Undefined />;
    case "null":
      return <Null />;
    case "boolean":
      return <Boolean data={data} />;
    case "number":
      return <Number data={data} />;
    case "string":
      return <String data={data} />;
    case "object":
      return isShorthand ? (
        <span>{"{…}"}</span>
      ) : (
        <Object
          keyPrefix={keyPrefix}
          data={data}
          referenceData={referenceData}
          isRoot={isRoot}
        />
      );
    case "array":
      return isShorthand ? (
        <span>Array({data.value.length})</span>
      ) : (
        <Array
          keyPrefix={keyPrefix}
          data={data}
          referenceData={referenceData}
          isRoot={isRoot}
        />
      );
    case "error":
      return isShorthand ? data.value.stack : <Error data={data} />;
    default:
      return <div>{JSON.stringify(data)}</div>;
  }
  return null;
};

export default Result;
