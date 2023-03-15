import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { Component } from 'react';
import { Select } from '../Select';
import { Switcher } from '../Switcher';
import { File } from '../File';

export class FormPage extends Component {
  render() {
    return (
      <section className="form-page">
        <Header cards={[]} currentPage="FORM">
          {undefined}
        </Header>

        <Form>
          <Fieldset title="Personal Information">
            <Input id="one" label="First Name" type="text" />
            <Input id="two" label="Last Name" type="text" />
            <Input id="three" label="Birthday" type="date" />
            <File id="twelve"/>
          </Fieldset>

          <Fieldset title="Address">
            <Input id="four" label="Zip-code" type="text" />
            <Select
              multiple={false}
              label="City"
              value="Minsk"
              ops={['Minsk', 'Homel', 'Brest', 'Hrodna', 'Vitsebsk', 'Mahilow']}
            />
            <Input id="six" label="City" type="text" />
            <Input id="seven" label="Address" type="text" />
          </Fieldset>

          <Fieldset title="Contacts">
            <Input id="eight" label="E-mail" type="text" />
            <Switcher key="ten" title="I want to receive notifications by mail" id="ten"/>
            <Input id="nine" label="Phone" type="text" />
            <Switcher key="eleven" title="I want to receive sms" id="eleven"/>
          </Fieldset>
        </Form>
      </section>
    );
  }
}
