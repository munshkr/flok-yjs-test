import * as Y from "yjs";
import { UnControlled as CodeMirror } from "react-codemirror2";
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
    const { host, username } = this.props;
    const { editor } = this.codeMirror;

    const [hostname, _port] = host.split(":");

    // Create document and provider
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("flok", doc, {
      signaling: [`ws://${hostname}:3001`]
    });
    this.provider = provider;

    const editorId = "mainEditor";
    const userId = "munshkr";
    const userName = "munshkr";

    // Bind text with CodeMirror editor
    const text = doc.getText(`editors:${editorId}`);
    const binding = new CodeMirrorBinding(
      text,
      editor,
      username,
      provider.awareness
    );
    this.binding = binding;

    // Build Users map
    const userMap = doc.getMap(`users:${userId}`);
    userMap.set("n", userName);

    // Buil
    const userPosMap = doc.getMap(`users:${userId}:pos:${editorId}`);
    userPosMap.set("l", 1);
    userPosMap.set("c", 2);
  }

  componentWillUnmount() {
    if (this.binding) {
      this.binding.destroy();
    }

    if (this.provider) {
      this.provider.destroy();
    }
  }

  render() {
    const options = {
      theme: "material",
      lineNumbers: true
    };
    const { value } = this.state;
    const { provider } = this;

    return (
      <React.Fragment>
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
            font-family: Monaco, monospace;
            font-size: 20px;
          }
          .remote-caret {
            position: absolute;
            border-left: black;
            border-left-style: solid;
            border-left-width: 2px;
            height: 1em;
          }
          .remote-caret > div {
            position: relative;
            top: -1.05em;
            font-size: 16px;
            background-color: rgb(250, 129, 0);
            font-family: Monaco, monospace;
            font-style: normal;
            font-weight: normal;
            line-height: normal;
            user-select: none;
            color: white;
            padding-left: 2px;
            padding-right: 2px;
            z-index: 3;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default TextBuffer;
