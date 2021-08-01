import DesignPanel from "./DesignPanel";
import { useParams } from "react-router-dom";
import DesignInterface from "./interfaces/DesignInterface";
import ImagePreview from "./ImagePreview";
import { useState, useRef } from "react";
import { Container, Col } from "react-bootstrap";
import ResizeObserver from "rc-resize-observer";
import Konva from "konva"


interface EditorProps {
  designs: Record<string, DesignInterface>;
  onScaleChange?: (scale: number) => void;
  stageRef?: React.RefObject<Konva.Stage>;
}
interface EditorParams {
  design: string;
}

const Editor: React.FC<EditorProps> = ({ designs, onScaleChange, stageRef }) => {
  const { design } = useParams<EditorParams>();

  const [formData, setFormData] = useState({});

  // image size
  const [width, setWidth]: [number, (value: number) => void] = useState(10);
  const [height, setHeight]: [number, (value: number) => void] = useState(10);
  const ratio = width / height;

  // image panel size
  const [imagePanelWidth, setImagePanelWidth] = useState<number>(10);
  const [imagePanelHeight, setImagePanelHeight] = useState<number>(10);
  const imagePanelRatio = imagePanelWidth / imagePanelHeight;

  const imagePanelRef = useRef<HTMLDivElement>(null);

  // Calculate Preview Size
  let previewWidth: number;
  let previewHeight: number;
  const imagePanelMarginFactor = 0.8;
  if (
    width < imagePanelMarginFactor * imagePanelWidth &&
    height < imagePanelMarginFactor * imagePanelHeight
  ) {
    previewWidth = width;
    previewHeight = height;
  } else {
    if (ratio > imagePanelRatio) {
      previewWidth = imagePanelWidth * imagePanelMarginFactor;
      previewHeight = previewWidth / ratio;
    } else {
      previewHeight = imagePanelHeight * imagePanelMarginFactor;
      previewWidth = previewHeight * ratio;
    }
  }
  if (onScaleChange) {
    onScaleChange(width / previewWidth); // Send scale to App for download button
  }

  const previewResize = () => {
    if (
      imagePanelRef?.current?.offsetHeight !== 0 &&
      imagePanelRef?.current?.offsetWidth !== 0
    ) {
      setImagePanelHeight(imagePanelRef?.current?.offsetHeight || 10);
      setImagePanelWidth(imagePanelRef?.current?.offsetWidth || 10);
    }
  };

  return (
    <>
      <Col
        md={5}
        className="h-100 overflow-auto d-md-flex flex-column tab-pane"
      >
        <Container className="pt-3 pb-3">
          <DesignPanel
            design={designs[design]}
            formData={formData}
            onFormDataChange={(e) => {
              setFormData(e.formData);
              if (e.formData?.size?.size === "custom") {
                setWidth(e.formData.size.width);
                setHeight(e.formData.size.height);
              } else {
                const [locWidth, locHeight] = e.formData?.size?.size.split("x");
                setWidth(Number(locWidth));
                setHeight(Number(locHeight));
              }
            }}
          ></DesignPanel>
        </Container>
      </Col>
      <ResizeObserver onResize={previewResize}>
        <Col
          md={7}
          className="my-auto mx-auto h-100 d-md-flex tab-pane imagePreviewCol"
          ref={imagePanelRef}
        >
          <Container className="my-auto imagePreviewContainer">
            <ImagePreview
              design={designs[design]}
              width={previewWidth}
              height={previewHeight}
              realWidth={width}
              realHeight={height}
              stageRef={stageRef}
            />
          </Container>
        </Col>
      </ResizeObserver>
    </>
  );
};

export default Editor;
