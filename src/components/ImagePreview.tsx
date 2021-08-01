import DesignInterface from "./interfaces/DesignInterface";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva"

interface ImagePreviewProps {
  design: DesignInterface;
  width: number;
  height: number;
  realWidth: number;
  realHeight: number;
  stageRef?: React.RefObject<Konva.Stage>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  design,
  width,
  height,
  stageRef
}) => {
  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        <Rect x={0} y={0} width={width} height={height} fill="red" />
        <design.Image />
      </Layer>
    </Stage>
  );
};

export default ImagePreview;
