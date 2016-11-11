/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import _ from 'lodash'
import { connect } from "react-redux"

@connect((store) => {
    return {
        cards: store.hingeState.status
    }
})
export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.style = {'textAlign': 'center', 'padding': '10px', 'marginTop': '5px'};
        this.availableStyle = {'boxShadow': '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            'border':'4px solid green', 'borderRadius': '30px'};
        this.unavailableStyle = {'boxShadow': '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            'border':'4px solid red', 'borderRadius': '30px'};
        this.availableIcon = {'float': 'right', 'fontSize': '30px', 'color' : 'white',
            'background': 'green', 'padding':'4px', 'borderRadius': '50%', 'marginRight': '4px'};
        this.unavailableIcon = {'float': 'right', 'fontSize': '30px', 'color' : 'white',
            'background': 'red', 'padding':'4px', 'borderRadius': '50%', 'marginRight': '4px'};
        this.availableNameStyle = {'borderTop': '3px solid green'};
        this.unavailableNameStyle = {'borderTop': '3px solid red'};
        this.names = ['', '', '', '', '', '', '', '', '1\" COMBO\n', '7/8\" COMBO\n', '3/4\" COMBO\n', '12\" ADJ WRENCH\n',
            '8\" ADJ WRENCH\n', '9-1/4\" VISEGRIPS\n', '10\" SNIPS\n', '1-1/2\" PUTTY KNIFE\n'];
    }

    render() {
        let style;
        let iconStyle;
        let nameStyle;
        let iconClass;
        // console.log(this.props.available);
        if(this.props.available == true){
            style = this.availableStyle;
            iconStyle = this.availableIcon;
            nameStyle = this.availableNameStyle;
            iconClass = "glyphicon glyphicon-ok";
        } else {
            style = this.unavailableStyle;
            iconStyle = this.unavailableIcon;
            nameStyle = this.unavailableNameStyle;
            iconClass = 'glyphicon glyphicon-remove';
        }

        let imgSrc = '../../../images/' + this.props.cardId + '.jpg';
        return (
            <div className="col-sm-3 " style={this.style}>
                <div className="ccard" style={style}>
                    <i className={iconClass} style={iconStyle}></i>
                    <img className="itemphoto" src={imgSrc}/>
                    <div style={nameStyle}>
                        <h4 style={{'marginBottom' : '10px'}}>{this.names[Number(this.props.cardId )]}</h4>
                    </div>
                </div>
            </div>
        );
    }
}