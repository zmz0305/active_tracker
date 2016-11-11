/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Card from  './Card';
import Particle from "../../../bower_components/particle-api-js/dist/particle.min";
import { connect } from "react-redux"

@connect((store)=>{
    return {
        user: store.hingeState.user,
        cards: store.hingeState.status,
        checkoutAmount: store.hingeState.checkoutAmount,
        authorized: store.hingeState.authorized
    }
})
export default class Subcontainer extends React.Component {
    constructor(){
        super();
    }

    componentDidMount() {

    }

    render() {
        if(this.props.authorized) {
            return (
                <div className="container-fluid"
                     style={{"background": 'white', 'textAlign': 'center', 'height': '100%'}}>
                    <h1>Hello {this.props.user}!</h1>
                    <div className="rows" style={{'background': 'red'}}>
                        {
                            this.props.cards.map((card, i)=> {
                                if(i >= 8){
                                    return (
                                        <Card key={i} available={card.available} cardId={card.id}></Card>
                                    )
                                }
                            })
                        }

                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}