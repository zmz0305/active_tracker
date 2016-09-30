import React from "react";

export default class Header extends React.Component {
  render() {
      return (
        <div className="container-fluid" style={{"background": 'white', 'textAlign': 'center', 'height': '9%'}}>
            <div className="row" style={{'borderBottom' : '2px'}}>
                <img className="logoimage" src="../../../images/keepstock.jpg"/>
            </div>
            <hr/>

        </div>
      );
  }
}
