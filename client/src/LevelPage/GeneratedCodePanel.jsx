import React from "react";
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/kuroir';
import connect from "react-redux/es/connect/connect";
import {conversion} from "./treeConversion";

class GeneratedCodePanel extends React.Component {

    render() {
        const code = this.updateCode();
        return (
            <div className="generated-code">
                <h3>Generated code</h3>
                <AceEditor
                    mode="c_cpp"
                    theme="kuroir"
                    name="code-generated"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={false}
                    width='100%'
                    maxLines={Infinity}
                    readOnly={true}
                    value={code}
                    />
            </div>
        );
    }

    updateCode() {
        const {tree} = this.props;
        return conversion.toCPP(tree);
    }

    componentWillUpdate(nextProps) {
        console.log(`update state`, nextProps);
    }
}

function mapStateToProps(state) {
    const {tree, treeId} = state.code;
    return {
        tree, treeId
    };
}

const connectedPlayground = connect(mapStateToProps)(GeneratedCodePanel);
export {connectedPlayground as GeneratedCodePanel};