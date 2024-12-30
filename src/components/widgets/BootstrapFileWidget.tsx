import React, { useRef } from "react";
import { WidgetProps } from "@rjsf/core";

const BootstrapFileWidget: React.FC<WidgetProps> = ({ onChange, value, uiSchema }) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const label = "test";

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newfile = (ev.target?.result as string).split(";")
        onChange(newfile[0] + ";" + 'name:' + file.name + ";" + newfile.slice(1).join(";"))
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="custom-file">
      <label ref={labelRef} className="custom-file-label">
        {value?.split(";")[1].split(":")[1] || "Kein Bild ausgewählt"}
      </label>
      <input
        onChange={onInputChange}
        type="file"
        className="custom-file-input"
        id="customFile"
        accept={uiSchema && uiSchema["ui:accept"] ? uiSchema["ui:accept"].join(",") : ""}
      />
    </div>
  );
};
export default BootstrapFileWidget;
