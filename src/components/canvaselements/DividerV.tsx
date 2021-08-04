import { Rect } from "react-konva";

interface DividerVProps {
  x: number;
  y: number;
  height: number;
  minX?: number;
  maxX?: number;
  onDragEnd?: (x: number) => void;
  onDragMove?: (x: number) => void;
}

const DividerV: React.FC<DividerVProps> = ({
  x,
  y,
  height,
  minX,
  maxX,
  onDragEnd,
  onDragMove,
}) => {
  const limitX = (x: number): number => {
    return Math.max(
      minX || -Infinity,
      Math.min(x, maxX || Infinity)
    );
  };
  return (
    <Rect
      x={x}
      y={y}
      width={1}
      height={height}
      stroke="#0099cc"
      strokeWidth={3}
      hitStrokeWidth={10}
      dashEnabled={false}
      dash={[2, 4]}
      name="divider"
      draggable
      dragBoundFunc={(pos) => {
        const newpos = {
          x: limitX(pos.x),
          y: y,
        };
        return newpos;
      }}
      onDragEnd={(e) => {
        if (onDragEnd) onDragEnd(limitX(e.target.attrs.x));
      }}
      onDragMove={(e) => {
        if (onDragMove) onDragMove(limitX(e.target.attrs.x));
      }}
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = "col-resize";
        }
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = "default";
        }
      }}
    ></Rect>
  );
};
export default DividerV;
