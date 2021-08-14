import baseSchema from "../baseSchema.json";
import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import _ from "lodash";
import DesignInterface from "./interfaces/DesignInterface";
import { AjvError, IChangeEvent } from "@rjsf/core";
import CircleColorWidget from "./widgets/CircleColorWidget";
import ToggleButtonWidget from "./widgets/ToggleButtonWidget";
import BootstrapFileWidget from "./widgets/BootstrapFileWidget";
import ImageSelectWidget from "./widgets/ImageSelectWidget";
import React from "react"
import ObjectFieldTemplate from "./widgets/ObjectFieldTemplate";

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
    file: BootstrapFileWidget,
    imageselect: ImageSelectWidget
  };

  const transformErrors = (errors: AjvError[]) => {
    //console.log("errors", errors);
    let newErrors: AjvError[] = [];
    let alreadydone: Array<string> = [];
    errors.forEach((error) => {
      if (error.name === "oneOf") return;
      if (error.name === "const") return;
      if (error.name === "enum") return;
      if (alreadydone.includes(error.stack)) return;
      alreadydone = alreadydone.concat(error.stack);
      newErrors = newErrors.concat(error);
    });
    return newErrors;
  };



  return (
    <Form
      liveValidate
      schema={schema}
      uiSchema={design.menuSchemaUI}
      formData={formData}
      onChange={onFormDataChange}
      widgets={widgets}
      showErrorList={false}
      transformErrors={transformErrors}
      ObjectFieldTemplate={ObjectFieldTemplate}
    >
      <div></div>
    </Form>
  );
};

export default DesignPanel;
