import { Header } from "../../app/Header";
import { Fieldset } from "../Fieldset";
import { Form } from "../Form";
import { Input } from "../Input";
import { Component } from "react";

export class FormPage extends Component {
  render() {
    return(
      <section className="form-page">
        <Header cards={[]} currentPage="FORM">
          {undefined}
        </Header>
        <Form>
          <Fieldset title="Personal Information">
            <Input
              id="one"
              label="First Name"
              type="text"
            />
            <Input
              id="two"
              label="Second Name"
              type="text"
            />
            <Input
              id="three"
              label="Age"
              type="text"
            />
            <Input
              id="four"
              label="Education"
              type="text"
            />
            <Input
              id="five"
              label="Profession"
              type="text"
            />
            <Input
              id="six"
              label="Hobbie"
              type="text"
            />
          </Fieldset>
        </Form>
      </section>
    );
  }
}
