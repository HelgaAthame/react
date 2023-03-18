import { ChangeEventHandler, forwardRef } from 'react';
import './file.scss';
import { ReactComponent as Upload } from '../../assets/upload.svg';

type FileProps = {
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  id: string;
};

export const File = forwardRef<HTMLSpanElement, FileProps>((props, ref) => (
  <div className="input__wrapper">
    <input
      type="file"
      name="file"
      accept="im/*"
      id={props.id}
      className="input__file"
      onChange={props.handleChange}
    />
    <label htmlFor={props.id} className="input__label">
      <span className="input__file-icon-wrapper">
        <Upload />
      </span>
      <span className="input__file-button-text" ref={ref}>
        UPLOAD PROFILE PHOTO
      </span>
    </label>
  </div>
));
