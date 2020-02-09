import { UnControlled as CodeMirror } from "react-codemirror2";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodeMirrorBinding } from "y-codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const ConnectButton = ({ provider }) => (
  <button
    onClick={() =>
      provider.shouldConnect ? provider.disconnect() : provider.connect()
    }
  >
    {provider.shouldConnect ? "Disconnect" : "Connect"}
  </button>
);

class TextBuffer extends React.Component {
  state = {
    value: ""
  };

  componentDidMount() {
    const { editor } = this.codeMirror;

    console.log(editor);

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("test-room", ydoc, {
      password: "mypassword",
      signaling: ["ws://localhost:3001"]
    });
    this.provider = provider;

    const yText = ydoc.getText("codemirror");
    const binding = new CodeMirrorBinding(yText, editor, provider.awareness);
    this.binding = binding;
  }

  render() {
    const options = {
      theme: "material",
      lineNumbers: true
    };
    const { value } = this.state;
    const { provider } = this;

    return (
      <div>
        {provider && <ConnectButton provider={provider} />}
        <CodeMirror
          ref={e => {
            this.codeMirror = e;
          }}
          className="buffer"
          value={value}
          options={options}
        />

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
      </div>
    );
  }
}

export default TextBuffer;
