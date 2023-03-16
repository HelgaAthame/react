import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { Component } from 'react';
import { Select } from '../Select';
import { Switcher } from '../Switcher';
import { File } from '../File';
import { Checkbox } from '../Checkbox';

export class FormPage extends Component {
  state = {
    cards: [],
    firstName: undefined,
    lastName: undefined,
    birthday: undefined,
    showMyAge: true,
    profilePhoto: 'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
    zipCode: undefined,
    country: undefined,
    city: undefined,
    address: undefined,
    email: undefined,
    receiveMail: true,
    phone: undefined,
    receiveSMS: true,
    firstCheckbox: true,
    secondCheckbox: true,
    thirdCheckbox: true,
  };

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
            <Checkbox id="thirteen" title="Show my age" />
            <File id="twelve"/>
          </Fieldset>

          <Fieldset title="Address">
            <Input id="four" label="Zip-code" type="text" />
            <Select
              multiple={false}
              label="Country"
              value="Minsk"
            />
            <Input id="six" label="City" type="text" />
            <Input id="seven" label="Address" type="text" />
          </Fieldset>

          <Fieldset title="Contacts">
            <Input id="eight" label="E-mail" type="text" />
            <Switcher key="ten" title="Receive notifications by mail" id="ten"/>
            <Input id="nine" label="Phone" type="text" />
            <Switcher key="eleven" title="Receive sms" id="eleven"/>
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox title="I like this website" id="fourteen" />
            <Checkbox title="I enjoy filling out forms" id="fifteen" />
            <Checkbox title="I like reading good books" id="sixteen" />
          </Fieldset>
        </Form>
      </section>
    );
  }
}
