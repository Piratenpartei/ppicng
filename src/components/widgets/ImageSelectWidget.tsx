import { WidgetProps } from "@rjsf/core";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const ImageSelectWidget: React.FC<WidgetProps> = ({
  id,
  value,
  options,
  onChange,
}) => {
  const enumOptions = options?.enumOptions as Array<{
    value: string;
    label: string;
    schema: {const: string, imagesrc: string, title: string}
  }>;
  return (<div  className={id + " imageselector"}>
      {enumOptions.map((option) => (
        <>    <input onChange={(e) => {onChange(option.value);}} checked={value===option.value} key={option.value} type="radio" id={id + option.value} value={option.value} name={id} />
        <label htmlFor={id + option.value} style={{backgroundImage: "url("+option.schema.imagesrc+")"}}></label></>
      ))}</div>
  );
};

export default ImageSelectWidget;
