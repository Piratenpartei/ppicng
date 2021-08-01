import { useRef } from "react";
import { Container, Col, Row, Navbar, Button } from "react-bootstrap";
import "./custom.scss";
import "./App.css";
import DesignNav from "./components/DesignNav";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Editor from "./components/Editor";
import designs from "./designs/designs";
import Konva from "konva";

let imageScale = 1;
const onScaleChange = (scale: number) => {
  imageScale = scale;
};

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const downloadImage = () => {
    if (stageRef?.current) {
      stageRef.current.find("Transformer").forEach((tf) => {
        tf.hide();
      });
      var link = document.createElement("a");
      link.download = "ppic.png";
      link.href = stageRef.current.toDataURL({ pixelRatio: imageScale });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      stageRef.current.find("Transformer").forEach((tf) => {
        tf.show();
      });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:design(" + Object.keys(designs).join("|") + ")"}>
          <Container fluid className="vh-100 p-0">
            <Col md={12} className="h-100 flex-column d-flex">
              <Row className="flex-row d-flex">
                <Navbar className="w-100" bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand>
                      <strong>ppic:</strong>ng
                    </Navbar.Brand>
                    <DesignNav designs={designs} />
                    <Button variant="primary" onClick={downloadImage}>
                      Download
                    </Button>
                  </Container>
                </Navbar>
              </Row>
              <Row className="flex-grow-1 flex-row d-md-flex d-block tab-content overflow-auto">
                <Editor
                  designs={designs}
                  onScaleChange={onScaleChange}
                  stageRef={stageRef}
                />
              </Row>
            </Col>
          </Container>
        </Route>
        <Route>
          <Redirect to={"/" + Object.keys(designs)[0]} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
