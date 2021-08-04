import { Group, Image as KonvaImage } from "react-konva";
import { useState } from "react";
import { Vector2d } from "konva/lib/types";

export enum Styles {
  fill,
  fit,
  stretch,
}

export enum Aligns {
  left,
  center,
  right,
}

export enum VAligns {
  top,
  middle,
  bottom,
}

export interface AutoScaleImageProps {
  image: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  style?: Styles;
  align?: Aligns;
  valign?: VAligns;
  draggable?: boolean
}

const AutoScaleImage: React.FC<AutoScaleImageProps> = ({
  image,
  style,
  width,
  height,
  x,
  y,
  align,
  valign,
  draggable,
  ...additionalProps
}) => {
  const [imageSrcWidth, setImageSrcWidth] = useState(0);
  const [imageSrcHeight, setImageSrcHeight] = useState(0);

  const ratio = width / height;
  const imageSrcRatio = imageSrcWidth / imageSrcHeight;

  let imageWidth: number = width;
  let imageHeight: number = height;

  if (style === Styles.fill) {
    if (ratio > imageSrcRatio) {
      imageWidth = width;
      imageHeight = imageWidth / imageSrcRatio;
    } else {
      imageHeight = height;
      imageWidth = imageHeight * imageSrcRatio;
    }
  } else if (style === Styles.fit) {
    if (ratio < imageSrcRatio) {
      imageWidth = width;
      imageHeight = imageWidth / imageSrcRatio;
    } else {
      imageHeight = height;
      imageWidth = imageHeight * imageSrcRatio;
    }
  }

  let imageX: number;

  if (align === Aligns.left) {
    imageX = 0;
  } else if (align === Aligns.right) {
    imageX = width - imageWidth;
  } else {
    imageX = (width - imageWidth) / 2;
  }

  let imageY: number;

  if (valign === VAligns.top) {
    imageY = 0;
  } else if (valign === VAligns.bottom) {
    imageY = height - imageHeight;
  } else {
    imageY = (height - imageHeight) / 2;
  }

  const imageObj = new Image();
  imageObj.src = image;
  imageObj.onload = () => {
    setImageSrcWidth(imageObj.width);
    setImageSrcHeight(imageObj.height);
  };

  const dragBoundFunc = (pos: Vector2d) => {

    if (style === Styles.fill) {
      const newX = Math.max(Math.min(pos.x, x || 0),(x || 0)-imageWidth+width)
      const newY = Math.max(Math.min(pos.y, y || 0),(y || 0)-imageHeight+height)
      return {x: newX, y: newY}
    } else if (style === Styles.fit) {
      const newX = Math.min(Math.max(pos.x, x || 0),(x || 0)-imageWidth+width)
      const newY = Math.min(Math.max(pos.y, y || 0),(y || 0)-imageHeight+height)
      return {x: newX, y: newY}
    }

    return {x: x || 0, y: y || 0}

  }

  return (
    <Group
      x={x || 0}
      y={y || 0}
      width={width}
      height={height}
      clipX={0}
      clipY={0}
      clipWidth={width}
      clipHeight={height}
    >
      {imageSrcWidth !== 0 && imageSrcHeight !== 0 && (
        <KonvaImage
          image={imageObj}
          width={imageWidth}
          height={imageHeight}
          x={imageX}
          y={imageY}
          draggable={draggable || false}
          dragBoundFunc={dragBoundFunc}
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container && draggable) {
              container.style.cursor = "move";
            }
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) {
              container.style.cursor = "default";
            }
          }}
          {...additionalProps}
        ></KonvaImage>
      )}
    </Group>
  );
};

export default AutoScaleImage;
