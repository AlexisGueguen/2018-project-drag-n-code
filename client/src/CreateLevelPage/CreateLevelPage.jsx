import React from 'react';
import connect from "react-redux/es/connect/connect";
import {levelActions} from "../_actions";
import translation from "../_constants/en";
import LoadingWheel from "../_components/LoadingPoints";
import {Link} from "react-router-dom";
import {DifficultyStars} from "../_components/DifficultyStars";
import AceEditor from "react-ace";
import 'brace/theme/chaos';
import {TableUserItem} from "../_components/TableUserItem";


const solutionExample = '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello, World!";\n    return 0;\n}';

class CreateLevelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            level: {
                title: '',
                description: '',
                statement: '',
                inputs: [],
                outputs: [],
                difficulty: '',
                solution: solutionExample,
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSolution = this.handleChangeSolution.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickStar = this.clickStar.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { level } = this.state;
        this.setState({
            level: {
                ...level,
                [name]: value
            }
        });
    }

    addInputElement(event) {

    }

    handleChangeSolution(value) {
        const { level } = this.state;
        this.setState({
            level: {
                ...level,
                solution: value
            }
        });    }

    handleSubmit(event) {
        event.preventDefault();
        const { level } = this.state;
        const {dispatch} = this.props;
        const {user} = this.props;

        this.setState({
            submitted: true,
        });

        if (level.title
            && level.description
            && level.statement
            && level.inputs
            && level.outputs
            && level.difficulty
        ) {
            level.isCreatedByCommunity = true;
            level.upVotes = 0;
            level.author = user._id;
            dispatch(levelActions.create(level));
        }
    }

    clickStar(event) {
        event.preventDefault();
        const { level } = this.state;
        this.setState({
            level: {
                ...level,
                difficulty: event.currentTarget.dataset.id
            }
        });
    }


    render() {
        const { loading  } = this.props;
        const { level, submitted } = this.state;
        return (
            <div className="create-level-page">
                <h2>{translation.createLevel.title}</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    {/*  Title and Difficulty  */}
                    <div className="main-input-container">
                        <div className={'form-group form-title' + (submitted && !level.title ? ' has-error' : '')}>
                            <label htmlFor="title">{translation.createLevel.titleField}</label>
                            <input type="text" className="form-control" name="title" value={level.title} onChange={this.handleChange} />
                            {submitted && !level.title &&
                            <div className="help-block">{translation.createLevel.titleRequired}</div>
                            }
                        </div>
                        <div className={'form-stars' + (submitted && !level.difficulty ? ' has-error' : '')}>
                            <label htmlFor="text">{translation.createLevel.difficultyField}</label>
                            {level.difficulty === '' ?
                                <div className="rating">
                                    <span onClick={this.clickStar} data-id="3">☆</span>
                                    <span onClick={this.clickStar} data-id="2">☆</span>
                                    <span onClick={this.clickStar} data-id="1">☆</span>
                                </div>
                                : <DifficultyStars value={level.difficulty}/>
                            }

                            {submitted && !level.difficulty &&
                            <div className="help-block">{translation.createLevel.difficultyRequired}</div>
                            }
                        </div>
                    </div>

                    {/*  Description  */}
                    <div className={'form-group form-description' + (submitted && !level.description ? ' has-error' : '')}>
                        <label htmlFor="description">{translation.createLevel.descriptionField}</label>
                        <input type="text" className="form-control" name="description" value={level.description} onChange={this.handleChange} />
                        {submitted && !level.description &&
                        <div className="help-block">{translation.createLevel.descriptionRequired}</div>
                        }
                    </div>

                    {/*  Statement  */}
                    <div className={'form-group form-statement' + (submitted && !level.statement ? ' has-error' : '')}>
                        <label htmlFor="statement">{translation.createLevel.statementField}</label>
                        <textarea rows="4" type="text" className="form-control" name="statement" value={level.statement} onChange={this.handleChange} />
                        {submitted && !level.statement &&
                        <div className="help-block">{translation.createLevel.statementRequired}</div>
                        }
                    </div>

                    {/*  Inputs  */}
                    <div className={'form-group ' + (submitted && !level.inputs ? ' has-error' : '')}>
                        <label htmlFor="inputs">{translation.createLevel.inputsField}</label>
                        {level.inputs &&
                            level.inputs.map((inputValue) =>
                                <div className="input-container">
                                    <input type="number"
                                           className="form-control form-input"
                                           name="inputs"
                                           placeholder="Number"
                                           step="1"
                                           value={inputValue}
                                           onChange={this.handleChange} />
                                </div>)
                        }
                        {
                            <input type="number"
                                   className="form-control form-input"
                                   name="inputs"
                                   placeholder="Number"
                                   step="1"
                                   value={level.inputs}
                                   onChange={this.handleChange} />
                        }
                        {submitted && !level.inputs &&
                        <div className="help-block">{translation.createLevel.inputsRequired}</div>
                        }
                    </div>

                    {/*  Outputs  */}
                    <div className={'form-group' + (submitted && !level.outputs ? ' has-error' : '')}>
                        <label htmlFor="outputs">{translation.createLevel.outputsField}</label>
                        <input type="text" className="form-control" name="outputs" value={level.outputs} onChange={this.handleChange} />
                        {submitted && !level.outputs &&
                        <div className="help-block">{translation.createLevel.outputsRequired}</div>
                        }
                    </div>

                    {/*  Solution  */}
                    <label htmlFor="statement">{translation.createLevel.solutionField}</label>
                    <div className="solution-code">
                        <AceEditor
                            mode="c_cpp"
                            theme="chaos"
                            name="solution"
                            fontSize={14}
                            showPrintMargin={false}
                            showGutter={false}
                            highlightActiveLine={false}
                            width='100%'
                            height='300px'
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: false,
                                showLineNumbers: false,
                                tabSize: 1,
                            }}
                            value={level.solution}
                            onChange={this.handleChangeSolution}/>
                    </div>

                    {/*  Submit  */}
                    <div className="form-group">
                        {loading ? (
                            <LoadingWheel/>
                        ) :(
                            <div className="form-actions">
                                <Link to="/community" className="btn-cancel btn btn-link col-md-6 col-sm-6">{translation.createLevel.cancelLink}</Link>
                                <button className="btn btn-primary col-md-6 col-sm-6">{translation.createLevel.createLink}</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loading } = state.createLevel;
    const { user } = state.authentication;
    return {
        loading,
        user
    };
}

const connectedCreateLevelPage = connect(mapStateToProps)(CreateLevelPage);
export { connectedCreateLevelPage as CreateLevelPage };