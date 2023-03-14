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
          <Fieldset>
            <Input
              id="one"
              label="First input"
              type="text"
            />
          </Fieldset>
        </Form>
      </section>
    );
  }
}
