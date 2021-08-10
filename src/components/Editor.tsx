import DesignPanel from "./DesignPanel";
import { useParams } from "react-router-dom";
import DesignInterface from "./interfaces/DesignInterface";
import ImagePreview from "./ImagePreview";
import { useState, useRef, useEffect } from "react";
import { Container, Col, Spinner } from "react-bootstrap";
import ResizeObserver from "rc-resize-observer";
import Konva from "konva";
import WebFont from "webfontloader";
import LogoInterface from "./interfaces/LogoInterface";

interface EditorProps {
  designs: Record<string, DesignInterface>;
  onScaleChange?: (scale: number) => void;
  stageRef?: React.RefObject<Konva.Stage>;
  pageState: number;
  logo?: LogoInterface;
  setFilename?: (filename: string) => void;
}
interface EditorParams {
  design: string;
}

const Editor: React.FC<EditorProps> = ({
  designs,
  onScaleChange,
  stageRef,
  pageState,
  logo,
  setFilename,
}) => {
  const { design } = useParams<EditorParams>();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    if (designs[design].fontFamilies) {
      setFontsLoaded(false);
      setTimeout(() => {
        WebFont.load({
          custom: {
            families: designs[design].fontFamilies,
          },
          active: () => {
            setFontsLoaded(true);
          },
        });
      }, 500);
    } else {
      setFontsLoaded(true);
    }
  }, [design, designs]);

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
        className={
          "h-100 overflow-auto d-md-flex flex-column tab-pane" +
          (pageState === 0 ? " active" : "")
        }
      >
        <Container className="pt-3 pb-3">
          <DesignPanel
            design={designs[design]}
            formData={formData}
            onFormDataChange={(e) => {
              if (e.errors.length > 0) return;
              setFormData(e.formData);
              if (e.formData?.size?.size === "custom") {
                setWidth(e.formData.size.width);
                setHeight(e.formData.size.height);
              } else {
                const [locWidth, locHeight] = e.formData?.size?.size.split("x");
                setWidth(Number(locWidth));
                setHeight(Number(locHeight));
              }
              if (setFilename && e.formData?.claim?.text) {
                const filename = e.formData?.claim?.text.replace(/[^\w]/ig, "");
                setFilename(filename);
              }
            }}
          ></DesignPanel>
        </Container>
      </Col>
      <ResizeObserver onResize={previewResize}>
        <Col
          md={7}
          className={
            "my-auto mx-auto h-100 d-md-flex tab-pane imagePreviewCol" +
            (pageState === 1 ? " active d-flex" : "")
          }
          ref={imagePanelRef}
        >
          <Container className="my-auto imagePreviewContainer">
            {fontsLoaded && (
              <ImagePreview
                design={designs[design]}
                width={previewWidth}
                height={previewHeight}
                realWidth={width}
                realHeight={height}
                stageRef={stageRef}
                formData={formData}
                logo={logo}
              />
            )}
            {!fontsLoaded && (
              <Spinner animation="border" role="status" variant="primary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Container>
        </Col>
      </ResizeObserver>
    </>
  );
};

export default Editor;
