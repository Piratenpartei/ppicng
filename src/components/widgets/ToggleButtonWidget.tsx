import { WidgetProps } from "@rjsf/core";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const ToggleButtonWidget: React.FC<WidgetProps> = ({
  id,
  value,
  options,
  onChange,
}) => {
  const enumOptions = options?.enumOptions as Array<{
    value: string;
    label: string;
  }>;
  return (
    <ToggleButtonGroup
      type="radio"
      name={id}
      value={value}
      onChange={(value) => onChange(value)}
    >
      {enumOptions.map((option) => (
        <ToggleButton
          variant={option.value === value ? "primary" : "outline-primary"}
          key={option.value}
          id={option.value}
          value={option.value}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonWidget;
