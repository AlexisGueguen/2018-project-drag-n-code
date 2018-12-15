import React from "react";
import LoadingWheel from "../_components/LoadingPoints";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import connect from "react-redux/es/connect/connect";
import {compilationActions} from "../_actions/compilation.actions";
import AceEditor from "react-ace";
import lang from "../_constants/en";
import {history} from '../_helpers';

const translation = lang.levelPage;

class SubmissionPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

        this.onValidationClick = this.onValidationClick.bind(this);
        this.onReduceClick = this.onReduceClick.bind(this);
        this.onExpandClick = this.onExpandClick.bind(this);
        this.onReturnMenuClick = this.onReturnMenuClick.bind(this);
    }

    onValidationClick() {
        const {level} = this.props;
        const {code} = this.props;
        this.props.dispatch(compilationActions.compile(code, level));
    }

    onReduceClick() {
        this.setState({
            expanded: false,
            showExpandButton: true
        })
    }

    onExpandClick() {
        this.setState({
            expanded: true
        })
    }

    onReturnMenuClick() {
        history.goBack();
    }

    render() {
        const {expanded, showExpandButton} = this.state;
        const {loading, result, code} = this.props;
        return (
            <div className={expanded ? 'submission-expanded' : 'submission-collapsed'}>
                {loading ? (
                    <LoadingWheel/>
                ) : (
                    <div className='content'>
                        {expanded ? (
                            <div className="expanded">
                                {result && !result.validated &&
                                <span className="glyphicon glyphicon-chevron-down close" onClick={this.onReduceClick}/>}
                                {result && result.validated ? (
                                    <div className="success">
                                        <h3>{translation.levelSuccessTitle}</h3>
                                        <p>{translation.yourCode}</p>
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
                                            wrapEnabled={true}
                                            editorProps={{$blockScrolling: Infinity}}
                                        />
                                        <button className='btn btn-primary'
                                                onClick={this.onReturnMenuClick}>{translation.returnMenu}</button>
                                    </div>
                                ) : (
                                    <div className="error">
                                        <h3>{translation.compilationError}</h3>
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
                                            value={result.output}
                                            editorProps={{$blockScrolling: Infinity}}
                                        />
                                        <p>{translation.tryAgain}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-primary" onClick={this.onValidationClick}>
                                    {translation.validate}
                                </button>
                                {showExpandButton &&
                                <span className="glyphicon glyphicon-chevron-up expand" onClick={this.onExpandClick}/>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            if (nextProps.result !== this.props.result) {
                this.setState({
                    expanded: true
                });
            }
        }
    }
}

function mapStateToProps(state) {
    const {loading, result} = state.compilation;
    const {level} = state.getLevel;
    const {code} = state.code;
    return {
        code,
        level,
        loading,
        result
    };
}

const connectedSubmissionPanel = DragDropContext(HTML5Backend)(connect(mapStateToProps)(SubmissionPanel));
export {connectedSubmissionPanel as SubmissionPanel};