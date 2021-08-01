import baseSchema from "../baseSchema.json";
import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import _ from "lodash";
import DesignInterface from "./interfaces/DesignInterface";
import { IChangeEvent } from "@rjsf/core";
import CircleColorWidget from "./widgets/CircleColorWidget";
import ToggleButtonWidget from "./widgets/ToggleButtonWidget";

interface DesignPanelProps {
  design: DesignInterface;
  formData: Object;
  onFormDataChange: (e: IChangeEvent) => void;
}

const DesignPanel: React.FC<DesignPanelProps> = ({
  design,
  formData,
  onFormDataChange,
}) => {
  const schema: JSONSchema7 = {};
  _.merge(schema, baseSchema, design.menuSchema);

  const widgets = {
    circlecolor: CircleColorWidget,
    togglebutton: ToggleButtonWidget,
  };

  return (
    <Form
      liveValidate
      schema={schema}
      uiSchema={design.menuSchemaUI}
      formData={formData}
      onChange={onFormDataChange}
      widgets={widgets}
    />
  );
};

export default DesignPanel;
