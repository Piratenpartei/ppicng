import { Button } from "react-bootstrap";
import { Hammer } from "react-bootstrap-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DesignInterface from "./interfaces/DesignInterface";

interface AdvancedOptionSwitchProps {
  designs: Record<string, DesignInterface>;
}
interface AdvancedOptionSwitchParams {
  design: string;
}

const AdvancedOptionSwitch: React.FC<AdvancedOptionSwitchProps> = ({
  designs,
}) => {
  const { design } = useParams() as { design: string }

  const [advancedActive, setAdvancedActive] = useState(false);

  let styleString = "";
  if (advancedActive) {
    styleString = ".form-advanced { display: block !important; }";
  }

  if (designs[design]?.advancedOptionsAvailable) {
    return (
      <>
        <style>{styleString}</style>
        <Button
          className="ml-1"
          variant={advancedActive ? "warning" : "light"}
          onClick={() => {
            setAdvancedActive(!advancedActive);
          }}
          title="Erweiterte Einstellungen"
        >
          <Hammer />
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};
export default AdvancedOptionSwitch;
