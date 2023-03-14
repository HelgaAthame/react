import { Fieldset } from "form/Fieldset";
import { Form } from "form/Form";
import { Input } from "form/Input";
import { Component } from "react";

export class FormPage extends Component {
  render() {
    return(
      <Form>
        <Fieldset>
          <Input
            id="one"
            label="First input"
            type="text"
          />
        </Fieldset>
      </Form>
    );
  }
}
