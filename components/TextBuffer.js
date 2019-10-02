import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

class TextBuffer extends React.Component {
  state = {
    value: ""
  };

  render() {
    const options = {
      theme: "material",
      lineNumbers: true
    };
    const { value } = this.state;

    return (
      <React.Fragment>
        <CodeMirror className="buffer" value={value} options={options} />

        <style jsx global>{`
          .CodeMirror {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            font-family: Monaco;
            font-size: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default TextBuffer;
