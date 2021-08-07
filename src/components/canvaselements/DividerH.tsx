import { Rect } from "react-konva";
import { useRef, useEffect } from "react";
import Konva from "konva";

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
    return Math.max(minY || -Infinity, Math.min(y, maxY || Infinity));
  };
  const lineRef = useRef<Konva.Rect>(null);
  const baseY = useRef(0);

  useEffect(() => {
    baseY.current = (lineRef?.current?.absolutePosition().y as number) - y;
  });

  return (
    <Rect
      x={x}
      y={y}
      ref={lineRef}
      width={width}
      height={0}
      stroke="#0099cc"
      strokeWidth={3}
      hitStrokeWidth={10}
      dashEnabled={false}
      dash={[5, 5]}
      name="divider"
      visible={false}
      draggable
      dragBoundFunc={(pos) => {
        const newpos = {
          y: baseY.current + limitY(pos.y - baseY.current),
          x: lineRef.current?.absolutePosition().x as number,
        };
        return newpos;
      }}
      onDragEnd={(e) => {
        const newY = e.target.attrs.y;
        if (onDragEnd) onDragEnd(limitY(newY));
      }}
      onDragMove={(e) => {
        const newY = e.target.attrs.y;
        if (onDragMove) onDragMove(limitY(newY));
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
