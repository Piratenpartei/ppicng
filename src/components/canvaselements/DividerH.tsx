import { Rect } from "react-konva";

interface DividerHProps {
  x: number;
  y: number;
  width: number;
  minY?: number;
  maxY?: number;
  onDragEnd?: (y: number) => void;
  onDragMove?: (y: number) => void;
}

const DividerH: React.FC<DividerHProps> = ({
  x,
  y,
  width,
  minY,
  maxY,
  onDragEnd,
  onDragMove,
}) => {
  const limitY = (y: number): number => {
    return Math.max(
      minY || -Infinity,
      Math.min(y, maxY || Infinity)
    );
  };

  return (
    <Rect
      x={x}
      y={y - 1}
      width={width}
      height={0}
      stroke="#0099cc"
      strokeWidth={3}
      hitStrokeWidth={10}
      dashEnabled={false}
      dash={[5, 5]}
      name="divider"
      draggable
      dragBoundFunc={(pos) => {
        const newpos = {
          y: limitY(pos.y),
          x: x,
        };
        return newpos;
      }}
      onDragEnd={(e) => {
        if (onDragEnd) onDragEnd(limitY(e.target.attrs.y));
      }}
      onDragMove={(e) => {
        if (onDragMove) onDragMove(limitY(e.target.attrs.y));
      }}
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        if (container) {
          container.style.cursor = "row-resize";
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
export default DividerH;
