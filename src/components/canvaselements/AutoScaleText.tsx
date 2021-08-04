import { Group, Text } from "react-konva";
import calculateTextWidth from "calculate-text-width";

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
  [x: string]: any;
}

const wrapText = (
  text: string,
  fontSize: number,
  width: number,
  height: number,
  font: string,
  lineHeight: number = 1
): { lines: Array<string>; maxWidth: number; lineWidths: Array<number> } => {
  const spaceWidth = calculateTextWidth(" ", fontSize + "px " + font);

  const textParagraphs = text.split("\n");

  let lines: Array<string> = [];
  let lineWidths: Array<number> = [];
  let maxWidth = 0;

  textParagraphs.forEach((paragraph) => {
    const words = paragraph
      .replace(/\s/g, "\n")
      //.replace(/-/g, "-\n")
      .split("\n");
    const wordWidths = words.map((word) =>
      calculateTextWidth(word, fontSize + "px " + font)
    );

    let currentLine = words.shift() as string;
    let currentWidth = wordWidths.shift();
    while (true) {
      if (words.length === 0) {
        lines = lines.concat(currentLine);
        lineWidths = lineWidths.concat(currentWidth);
        maxWidth = Math.max(maxWidth, currentWidth);
        break;
      } else if (
        words.length > 0 &&
        currentWidth + spaceWidth + wordWidths[0] > width
      ) {
        lines = lines.concat(currentLine);
        lineWidths = lineWidths.concat(currentWidth);
        maxWidth = Math.max(maxWidth, currentWidth);
        currentLine = words.shift() as string;
        currentWidth = wordWidths.shift();
      } else {
        currentLine += " " + (words.shift() as string);
        currentWidth += spaceWidth + wordWidths.shift();
      }
    }
  });
  return { lines: lines, maxWidth: maxWidth, lineWidths: lineWidths };
};

const AutoScaleText: React.FC<AutoScaleTextProps> = ({
  text,
  x,
  y,
  width,
  height,
  lineHeight = 1,
  fontFamily,
  align = "left",
  valign = "top",
  color = "#000000",
  shadowEnabled = false,
  ...additionalProps
}) => {
  const ratio = width / height;

  const baseHeight = 100;
  const baseWidth = baseHeight * ratio;

  let factor1 = 1;

  let baseFontSize = baseHeight;

  let lines: Array<string> = [];
  let lineWidths: Array<number> = [];
  let textHeight = 0;

  let n = 0;
  while (true) {
    const {
      lines: probeLines,
      maxWidth: probeWidth,
      lineWidths: probeLineWidths,
    } = wrapText(text, baseFontSize, baseWidth, height, fontFamily, lineHeight);
    lines = probeLines;
    lineWidths = probeLineWidths;
    const probeHeight =
      probeLines.length * baseFontSize +
      (probeLines.length - 1) * (lineHeight - 1) * baseFontSize;
    textHeight = probeHeight;
    if (probeHeight <= baseHeight && probeWidth <= baseWidth) {
      const probeRatio = probeWidth / probeHeight;
      if (probeRatio > ratio) {
        factor1 = baseWidth / probeWidth;
      } else {
        factor1 = baseHeight / probeHeight;
      }
      break;
    } else {
      baseFontSize *= Math.min(Math.max(baseHeight/probeHeight*1.5, baseWidth/probeWidth*1.5),0.9);
    }
    if (n++ > 20) break;
  }

  const fontSize = (height / baseHeight) * baseFontSize * factor1;
  lineWidths = lineWidths.map((x) => (x * fontSize) / baseFontSize);
  textHeight *= fontSize / baseFontSize;

  return (
    <Group x={x} y={y} width={width} height={height}>
      {/* <Rect x={0} y={0} width={width} height={height} stroke="black" /> */}
      {lines.map((line, index) => (
        <Text
          align={align}
          key={index}
          text={line}
          x={
            align === "right"
              ? width - lineWidths[index]
              : align === "center"
              ? width / 2 - lineWidths[index] / 2
              : 0
          }
          y={
            index * fontSize * lineHeight +
            (valign === "bottom" ? height - textHeight : 0) +
            (valign === "middle" ? (height - textHeight) / 2 : 0)
          }
          fontFamily={fontFamily}
          fontSize={fontSize}
          fill={color}
          shadowOffsetX={fontSize / 10}
          shadowOffsetY={fontSize / 10}
          shadowBlur={fontSize / 10}
          shadowEnabled={shadowEnabled}
          {...additionalProps}
        />
      ))}
    </Group>
  );
};
export default AutoScaleText;
