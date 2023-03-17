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
/*export class File extends Component<FileProps> {
  upload: RefObject<HTMLSpanElement>;

  constructor(props: FileProps) {
    super(props);
    this.upload = createRef<HTMLSpanElement>();
  }

  handleCahnge(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    let file;
    if (input.files && Array.from(input.files).at(-1)) {
      file = Array.from(input.files).at(-1) as Blob;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        const fileUrl = reader.result;
        this.setState({url: fileUrl});
        if (this.upload && this.upload.current) this.upload.current.innerHTML = 'FILE UPLOADED';
      };
    }
  }

  render() {
    return(
      <div className="input__wrapper">
        <input type="file" name="file" accept="im/*" id={this.props.id} className="input__file" onChange={this.handleCahnge.bind(this)}/>
        <label htmlFor={this.props.id} className="input__label">
          <span className="input__file-icon-wrapper">
            <Upload />
          </span>
          <span className="input__file-button-text" ref={this.upload}>UPLOAD PROFILE PHOTO</span>
        </label>
      </div>
    );
  }
}*/
