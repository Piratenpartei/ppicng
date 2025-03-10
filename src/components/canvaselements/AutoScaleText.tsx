import { Group, Text, Rect } from "react-konva";
import calculateTextWidth from "calculate-text-width";
import React from "react"

interface AutoScaleTextProps {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lineHeight?: number;
  fontFamily: string;
  color?: string;
  align?: string;
  valign?: string;
  shadowEnabled?: boolean;
  eline?: string;
  elineMarginFactor?: number;
  bgColor?: string;
  bgYOffsetFactor?: number
  [x: string]: any;
}

const wrapText = (
  text: string,
  fontSize: number,
  width: number,
  height: number,
  font: string,
  lineHeight: number = 1,
  reverse: boolean = false
): { lines: string[][]; maxWidth: number; lineWidths: Array<number> } => {
  const spaceWidth = calculateTextWidth(" ", fontSize + "px " + font);

  const textParagraphs = reverse
    ? text.split("\n").reverse()
    : text.split("\n");

  let lines: string[][] = [];
  let lineWidths: Array<number> = [];
  let maxWidth = 0;

  textParagraphs.forEach((paragraph) => {
    let words = paragraph
      .replace(/\s/g, "\n")
      //.replace(/-/g, "-\n")
      .split("\n");
    words = reverse ? words.reverse() : words;
    const wordWidths = words.map((word) =>
      calculateTextWidth(word, fontSize + "px " + font)
    );

    let currentLine = [words.shift() as string];
    let currentWidth = wordWidths.shift();
    while (true) {
      if (words.length === 0) {
        lines = lines.concat([reverse ? currentLine.reverse() : currentLine]);
        lineWidths = lineWidths.concat(currentWidth);
        maxWidth = Math.max(maxWidth, currentWidth);
        break;
      } else if (
        words.length > 0 &&
        currentWidth + spaceWidth + wordWidths[0] > width
      ) {
        lines = lines.concat([reverse ? currentLine.reverse() : currentLine]);
        lineWidths = lineWidths.concat(currentWidth);
        maxWidth = Math.max(maxWidth, currentWidth);
        currentLine = [words.shift() as string];
        currentWidth = wordWidths.shift();
      } else {
        currentLine = currentLine.concat(words.shift() as string);
        currentWidth += spaceWidth + wordWidths.shift();
      }
    }
  });
  return {
    lines: reverse ? lines.reverse() : lines,
    maxWidth: maxWidth,
    lineWidths: reverse ? lineWidths.reverse() : lineWidths,
  };
};

const AutoScaleText: React.FC<AutoScaleTextProps> = ({
  text,
  x,
  y,
  width,
  height,
  lineHeight = 1,
  fontFamily,
  eline,
  elineMarginFactor = 1,
  align = "left",
  valign = "top",
  color = "#000000",
  shadowEnabled = false,
  bgColor,
  bgYOffsetFactor = 0,
  ...additionalProps
}) => {
  const ratio = width / height;

  const baseHeight = 100;
  const baseWidth = baseHeight * ratio;

  let factor1 = 1;

  let baseFontSize = baseHeight;

  let lines: string[][] = [];
  let lineWidths: Array<number> = [];
  let textHeight = 0;

  let elineHeight = 0;
  let elineMargin = 0;

  let n = 0;
  while (true) {
    const {
      lines: probeLines,
      maxWidth: probeWidth,
      lineWidths: probeLineWidths,
    } = wrapText(
      text,
      baseFontSize,
      baseWidth,
      height,
      fontFamily,
      lineHeight,
      valign === "bottom"
    );
    lines = probeLines;
    lineWidths = probeLineWidths;
    const probeHeight =
      probeLines.length * baseFontSize +
      (probeLines.length - 1) * (lineHeight - 1) * baseFontSize;
    textHeight = probeHeight;

    elineHeight = eline ? baseFontSize / 7 : 0;
    elineMargin = eline ? baseFontSize / 5 : 0;

    const testBaseHeight = baseHeight - elineHeight - elineMargin;
    const testRatio = baseWidth / testBaseHeight;

    if (probeHeight <= testBaseHeight && probeWidth <= baseWidth) {
      const probeRatio = probeWidth / probeHeight;
      if (probeRatio > testRatio) {
        factor1 = baseWidth / probeWidth;
      } else {
        factor1 = testBaseHeight / probeHeight;
      }
      break;
    } else {
      baseFontSize *= Math.min(
        Math.max(
          (testBaseHeight / probeHeight) * 1.5,
          (baseWidth / probeWidth) * 1.5
        ),
        0.9
      );
    }
    if (n++ > 20) break;
  }

  const fontSize = (height / baseHeight) * baseFontSize * factor1;
  lineWidths = lineWidths.map((x) => (x * fontSize) / baseFontSize);
  textHeight *= fontSize / baseFontSize;
  elineHeight *= fontSize / baseFontSize;
  elineMargin *= fontSize / baseFontSize;

  const bgMarginX = (bgColor) ? fontSize/10 : 0
  const maxLineWidth = Math.max(...lineWidths)
  const bgScale = (bgColor) ? (maxLineWidth-bgMarginX*2)/maxLineWidth : 1

  return (
    <Group x={x} y={y} width={width} height={height}>
      <Group x={bgMarginX} scaleX={bgScale} scaleY={bgScale}>
      {/* <Rect x={0} y={0} width={width} height={height} stroke="black" /> */}
      {lines.map((line, index) => {
        const lineWidth = lineWidths[index];
        const lineX =
          align === "right"
            ? width - lineWidth
            : align === "center"
            ? width / 2 - lineWidth / 2
            : 0;
        /*         const lineY =
          -elineHeight -
          elineMargin +
          index * fontSize * lineHeight +
          (valign === "bottom" ? height - textHeight : 0) +
          (valign === "middle" ? (height - textHeight) / 2 : 0); */
        const lineY =
          -(eline ? elineMargin : 0) +
          (valign === "bottom"
            ? index * fontSize * lineHeight + height - textHeight
            : valign === "middle"
            ? index * fontSize * lineHeight + (height - textHeight) / 2
            : index * fontSize * lineHeight);
        return (
          <React.Fragment key={"frag"+ index}>
            {bgColor && (
              <Rect
                key={"rect"+ index}
                x={lineX-fontSize/10}
                y={lineY+fontSize*bgYOffsetFactor-fontSize/20}
                width={lineWidth+fontSize/5}
                height={fontSize+fontSize/10}
                fill={bgColor}
              />
            )}
            <Text
              align={align}
              key={index}
              text={line.join(" ")}
              x={lineX}
              y={lineY}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fill={color}
              shadowOffsetX={fontSize / 10}
              shadowOffsetY={fontSize / 10}
              shadowBlur={fontSize / 10}
              shadowEnabled={shadowEnabled}
              {...additionalProps}
            />
          </React.Fragment>
        );
      })}
      </Group>
      {eline && (
        <Rect
          x={
            align === "right"
              ? width - lineWidths[lineWidths.length - 1]
              : align === "center"
              ? width / 2 - lineWidths[lineWidths.length - 1] / 2
              : 0
          }
          /*           y={
            lineWidths.length * fontSize * lineHeight +
            (valign === "bottom" ? height - textHeight : 0) +
            (valign === "middle" ? (height - textHeight) / 2 : 0)
          } */
          y={
            fontSize -
            elineHeight +
            (valign === "bottom"
              ? (lineWidths.length - 1) * fontSize * lineHeight +
                height -
                textHeight
              : valign === "middle"
              ? (lineWidths.length - 1) * fontSize * lineHeight +
                (height - textHeight) / 2
              : (lineWidths.length - 1) * fontSize * lineHeight)
          }
          height={elineHeight}
          width={lineWidths[lineWidths.length - 1]}
          fill={eline}
        />
      )}
    </Group>
  );
};
export default AutoScaleText;
