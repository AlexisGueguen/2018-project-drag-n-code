import React from "react";
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/kuroir';

const initialValue = `#include <iostream>
using namespace std;

int main()
{
    cout << "Hello, World!";
    return 0;
}`;

export default class GeneratedCodePanel extends React.Component {

    render() {
        return (
            <div className="generated-code">
                <h3>Generated code</h3>
                <AceEditor
                    mode="c_cpp"
                    theme="kuroir"
                    name="blah2"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={false}
                    width='100%'
                    height='300px'
                    readOnly={true}
                    value={initialValue}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: false,
                        tabSize: 1,
                    }}/>
            </div>
        );
    }
}