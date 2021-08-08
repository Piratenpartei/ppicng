import DesignInterface from "./interfaces/DesignInterface";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import LogoInterface from "./interfaces/LogoInterface";

export interface ImagePreviewProps {
  design: DesignInterface;
  width: number;
  height: number;
  realWidth: number;
  realHeight: number;
  stageRef?: React.RefObject<Konva.Stage>;
  formData: any;
  logo?: LogoInterface
}

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
  return (
    <Stage
      width={props.width}
      height={props.height}
      ref={props.stageRef}
      onTouchStart={(e) => {
        if (props?.stageRef?.current) {
          props?.stageRef?.current
            .find("Transformer, .divider")
            .forEach((tf) => {
              tf.show();
            });
        }
      }}
      onMouseEnter={(e) => {
        if (props?.stageRef?.current) {
          props?.stageRef?.current
            .find("Transformer, .divider")
            .forEach((tf) => {
              tf.show();
            });
        }
      }}
      onMouseLeave={(e) => {
        if (props?.stageRef?.current) {
          props?.stageRef?.current
            .find("Transformer, .divider")
            .forEach((tf) => {
              tf.hide();
            });
        }
      }}
    >
      <Layer>
        <props.design.Image {...props} />
      </Layer>
    </Stage>
  );
};

export default ImagePreview;
