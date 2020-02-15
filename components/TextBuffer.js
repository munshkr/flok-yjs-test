import { UnControlled as CodeMirror } from "react-codemirror2";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodeMirrorBinding } from "../lib/y-codemirror";

const ConnectButton = ({ provider }) => (
  <button
    onClick={() =>
      provider.shouldConnect ? provider.disconnect() : provider.connect()
    }
  >
    {provider.shouldConnect ? "Disconnect" : "Connect"}
  </button>
);

/*
type UserData = {
  es: { [editorId: string]: UserPosData }; // editors
  n: string; // username
}

type SessionDocumentType = {
  contents: { [editorId: string]: string },
  users: { [userId: string]: UserData }
};
*/

class TextBuffer extends React.Component {
  state = {
    value: ""
  };

  componentDidMount() {
    const { editor } = this.codeMirror;

    console.log(editor);

    // Create document and provider
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("flok", doc, {
      password: "flok",
      signaling: ["ws://localhost:3001"]
    });
    this.provider = provider;

    const editorId = "mainEditor";
    const userId = "munshkr";
    const userName = "munshkr";

    // Bind text with CodeMirror editor
    const text = doc.getText(`editors:${editorId}`);
    const binding = new CodeMirrorBinding(text, editor, provider.awareness);
    this.binding = binding;

    // Build Users map
    const userMap = doc.getMap(`users:${userId}`);
    userMap.set("n", userName);

    // Buil
    const userPosMap = doc.getMap(`users:${userId}:pos:${editorId}`);
    userPosMap.set("l", 1);
    userPosMap.set("c", 2);
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
