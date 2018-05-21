import React from 'react';

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        console.log(this.state);
    }

    render() {
        var tit = this.state.module.title;
        return (
            <li className="list-group-item">
                {tit}
                <span className="float-right">
          <i className="fa fa-trash"></i>
          <i className="fa fa-pencil"></i>
        </span>
            </li>
        );
    }
}
