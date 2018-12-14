import React from "react";
import LoadingWheel from "../_components/LoadingPoints";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import connect from "react-redux/es/connect/connect";
import {compilationActions} from "../_actions/compilation.actions";

class SubmissionPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };

        this.onValidationClick = this.onValidationClick.bind(this);
        this.onReduceClick = this.onReduceClick.bind(this);
        this.onExpandClick = this.onExpandClick.bind(this);
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

    render() {
        console.log('result', this.props.result);
        const {expanded, showExpandButton} = this.state;
        const {loading, result} = this.props;
        return (
            <div className={expanded ? 'submission-expanded' : 'submission-collapsed'}>
                {
                    loading ? (
                        <LoadingWheel/>
                    ) : (
                        <div className='content'>
                            {
                                expanded ? (
                                    <div className="expanded">
                                        <span className="glyphicon glyphicon-chevron-down close" onClick={this.onReduceClick}/>
                                        <p>{result}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={this.onValidationClick}>
                                            Validate
                                        </button>
                                        {showExpandButton && <span className="glyphicon glyphicon-chevron-up expand" onClick={this.onExpandClick}/>}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
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