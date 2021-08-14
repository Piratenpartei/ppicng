import React from "react"
import { Card } from "react-bootstrap";
import { ObjectFieldTemplateProps } from "@rjsf/core";

const ObjectFieldTemplate:React.FC<ObjectFieldTemplateProps> = (props) => {
    console.log("haha", props)

    const className = (props.uiSchema.advancedOnly) ? "form-advanced" : ""
    const style = (props.uiSchema.advancedOnly) ? {backgroundColor: "#ffc10755", padding: 10} : {}

    if (props.title !== "") {
    return (
      <div className={className} style={style}>
        <Card>
          <Card.Header as ="h5">{props.title}</Card.Header>
        <Card.Body>
        <Card.Text>{props.description}
        {props.properties.map(element => <div className="property-wrapper">{element.content}</div>)}</Card.Text>
        </Card.Body>
        </Card>
      </div>
    );
    } else {
      return (
        <div className={className} style={style}>
          {props.description}
          {props.properties.map(element => <div className="property-wrapper">{element.content}</div>)}
        </div>
      );
    }
  }

  export default ObjectFieldTemplate