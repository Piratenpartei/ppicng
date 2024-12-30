import { useRef, useState } from "react";
import {
  Container,
  Col,
  Row,
  Navbar,
  Button,
  ButtonGroup,
  Nav,
} from "react-bootstrap";
import "./custom.scss";
import "./App.css";
import DesignNav from "./components/DesignNav";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import Editor from "./components/Editor";
import designs from "./designs";
import Konva from "konva";
import InfoModal from "./components/InfoModal";
import LogoModal from "./components/LogoModal";
import logos0 from "./logos/logos.json";
import LogoInterface from "./components/interfaces/LogoInterface";
import LogoGroupInterface from "./components/interfaces/LogoGroupInterface"
import PWAButton from "./components/PWAButton";
import PiwikReactRouter from "piwik-react-router";
import { createBrowserHistory } from "history"
import pjson from "../package.json"
import AdvancedOptionSwitch from "./components/AdvancedOptionSwitch";
import { Download } from "react-bootstrap-icons";

const history = createBrowserHistory();
const piwik = PiwikReactRouter({
	url: process.env.REACT_APP_MATOMO_URL,
	siteId: process.env.REACT_APP_MATOMO_SITEID,
  enableLinkTracking: false
});

let imageScale = 1;
const onScaleChange = (scale: number) => {
  imageScale = scale;
};

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const [pageState, setPageState] = useState(0);
  const [disableMatomoLocal, setDisableMatomo] = useState<boolean>((localStorage.getItem("disable-matomo") && localStorage.getItem("disable-matomo") === "true") ? true : false)
  const disableMatomo = disableMatomoLocal || process.env.REACT_APP_MATOMO_ENABLE != "true"


  const logos = logos0 as { [x: string]: LogoGroupInterface };

  let filename = "ppic";

  //const logosFirstGroupKey = Object.keys(logos)[0];
  //const logosFirstLogoKey = Object.keys(logos[logosFirstGroupKey].logos)[0];

  const [logo, setLogo] = useState<
    { group: string; key: string; logo: LogoInterface } | undefined
  >(undefined);

  const downloadImage = (showLines: boolean) => {
    if (stageRef?.current) {
      //console.log("test1", stageRef.current.find(".divider"))

      if (!disableMatomo) {
        console.log(pjson.version)
        piwik.push(['trackEvent', window.location.pathname, 'download', undefined, undefined, {dimension1: pjson.version}])
      }

      //trackEvent({ category: window.location.pathname        , action: 'download' })

      stageRef.current.find("Transformer, .divider").forEach((tf) => {
        tf.hide();
      });
      var link = document.createElement("a");
      const newFilename = filename.replace(/[^\w]/gi, "").substring(0, 32);
      link.download = newFilename !== "" ? newFilename + ".jpg" : "ppic.jpg";
      link.href = stageRef.current.toDataURL({ pixelRatio: imageScale, mimeType: "image/jpeg" });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (showLines) {
        stageRef.current.find("Transformer, .divider").forEach((tf) => {
          tf.show();
        });
      }
    }
  };

  return (
    <Router history={piwik.connectToHistory(history, () => {return undefined})}>
      <Switch>
        <Route path={"/:design(" + Object.keys(designs).join("|") + ")"}>
          <Container fluid className="vh-100 p-0">
            <Col md={12} className="h-100 flex-column d-flex">
              <Row className="flex-row d-flex">
                <Navbar className="w-100" bg="primary" variant="dark">
                  <Container fluid>
                    <Navbar.Brand>
                      <strong>ppic:</strong>ng
                    </Navbar.Brand>
                    <Navbar.Collapse>
                      <Nav>
                        <DesignNav designs={designs} />
                        <LogoModal
                          logo={logo}
                          logos={logos}
                          onChange={(groupname, logoname) => {
                            setLogo({
                              group: groupname,
                              key: logoname,
                              logo: logos[groupname].logos[logoname],
                            });
                          }}
                          designs={designs}
                        />
                      </Nav>
                    </Navbar.Collapse>
                    <PWAButton />
                    <InfoModal disableMatomo={disableMatomo} setDisableMatomo={setDisableMatomo} />
                    <AdvancedOptionSwitch designs={designs} />
                    <Button
                      variant="success"
                      onClick={() => downloadImage(false)}
                      className="ml-1 d-md-block d-none"
                      title="Download"
                    >
                      <Download></Download>
                    </Button>
                  </Container>
                </Navbar>
              </Row>
              <Row className="flex-row d-md-none d-flex">
                <Navbar bg="light" variant="light" className="w-100">
                  <Container fluid className="justify-content-center">
                    {" "}
                    <ButtonGroup>
                      <Button
                        variant={
                          pageState === 0 ? "primary" : "outline-primary"
                        }
                        onClick={() => {
                          setPageState(0);
                        }}
                      >
                        Editor
                      </Button>
                      <Button
                        variant={
                          pageState === 1 ? "primary" : "outline-primary"
                        }
                        onClick={() => {
                          setPageState(1);
                        }}
                      >
                        Vorschau
                      </Button>
                    </ButtonGroup>
                    <Button
                      variant="success"
                      onClick={() => downloadImage(true)}
                      className="ml-5 d-md-none d-block"
                      title="Download"
                    >
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
                  pageState={pageState}
                  logo={logo?.logo}
                  setFilename={(filenameNew) => {
                    filename = filenameNew;
                  }}
                />
              </Row>
            </Col>
          </Container>
        </Route>
        <Route>
          <Redirect to={"/" + (process.env.REACT_APP_DESIGN_DEFAULT || Object.keys(designs)[0])} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
