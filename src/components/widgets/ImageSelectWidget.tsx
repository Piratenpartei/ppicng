import { WidgetProps } from "@rjsf/core";

const ImageSelectWidget: React.FC<WidgetProps> = ({
  id,
  value,
  options,
  onChange,
}) => {
  const enumOptions = options?.enumOptions as Array<{
    value: string;
    label: string;
    schema: { const: string; imagesrc: string; title: string };
  }>;
  return (
    <div className={id + " imageselector"}>
      {enumOptions.map((option) => (
        <span key={"inputspan" + option.value}>
          {" "}
          <input
            onChange={(e) => {
              onChange(option.value);
            }}
            checked={value === option.value}
            key={"input" + option.value}
            type="radio"
            id={id + option.value}
            value={option.value}
            name={id}
          />
          <label
            key={"label" + option.value}
            htmlFor={id + option.value}
            style={{ backgroundImage: "url(" + option.schema.imagesrc + ")" }}
          ></label>
        </span>
      ))}
    </div>
  );
};

export default ImageSelectWidget;
