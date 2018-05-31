import React from 'react';
import WidgetListBox from './WidgetList'

export default class WidgetListEditor
    extends React.Component {

    constructor(props) {
        console.log(props);
        super(props)
        this.state = {lessonId: props.match.params.lessonId};
    }

    componentDidMount() {
        this.setState({lessonId: this.props.match.params.lessonId});
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({lessonId: newProps.match.params.lessonId});
    }

    render() {
        console.log(this.state.lessonId);
        return (
            <div>
                <WidgetListBox lessonId={this.state.lessonId}/>
            </div>
        );
    }
}