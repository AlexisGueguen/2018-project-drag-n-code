import React from "react";
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/xcode';
import connect from "react-redux/es/connect/connect";
import Select from "react-select";

const languages = {
    cpp: 'c++'
};

class GeneratedCodePanel extends React.Component {

    render() {
        const {code} = this.props;
        return (
            <div className="generated-code">
                <div>
                    <h3>Generated code</h3>
                    <Select
                        placeholder='Sort by'
                        onChange={this.handleLanguageChange}
                        value={{value: languages.cpp, label: languages.cpp}}
                        options={[
                            {value: languages.cpp, label: languages.cpp},
                        ]}
                    />
                </div>
                <AceEditor
                    mode="c_cpp"
                    theme="xcode"
                    name="code-generated"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={false}
                    width='100%'
                    maxLines={Infinity}
                    readOnly={true}
                    value={code}
                    editorProps={{$blockScrolling: Infinity}}
                    />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {code} = state.code;
    return {
        code
    };
}

const connectedPlayground = connect(mapStateToProps)(GeneratedCodePanel);
export {connectedPlayground as GeneratedCodePanel};