import { Rect } from "react-konva";
import { useRef, useEffect } from "react";
import Konva from "konva";

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
    return Math.max(minX || -Infinity, Math.min(x, maxX || Infinity));
  };
  const lineRef = useRef<Konva.Rect>(null);
  let baseX = 0;

  useEffect(() => {
    baseX = (lineRef?.current?.absolutePosition().x as number) - x;
  });
  return (
    <Rect
      x={x}
      y={y}
      ref={lineRef}
      width={1}
      height={height}
      stroke="#0099cc"
      strokeWidth={3}
      hitStrokeWidth={10}
      dashEnabled={false}
      dash={[2, 4]}
      name="divider"
      draggable
      visible={false}
      dragBoundFunc={(pos) => {
        const newpos = {
          y: lineRef.current?.absolutePosition().y as number,
          x: baseX + limitX(pos.x - baseX),
        };
        return newpos;
      }}
      onDragEnd={(e) => {
        const newX = e.target.attrs.x;
        if (onDragEnd) onDragEnd(limitX(newX));
      }}
      onDragMove={(e) => {
        const newX = e.target.attrs.x;
        if (onDragMove) onDragMove(limitX(newX));
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
