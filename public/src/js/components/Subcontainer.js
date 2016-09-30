/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Card from  './Card';
import Particle from "../../../bower_components/particle-api-js/dist/particle.min";


export default class Subcontainer extends React.Component {
    constructor(){
        super();
        this.state = {
            cards: []
        }

    }

    componentDidMount() {
        var intervalId = setInterval(()=>{
            if(this.props.initState.finished){
                for(var itemId in this.props.initState.status){
                    this.state.cards.push({id: itemId, available: this.props.initState.status[itemId]});
                    this.setState(this.state.cards);
                }
                clearInterval(intervalId);
            }
        }, 1000);

        var particle = new Particle();

        particle.getEventStream({ deviceId: '1e0021000347343337373738', auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'}).then(function(stream) {
            stream.on('toolReturned', function(data) {
                if(this.props.authorized){
                    var idx = Number(data.data);
                    var tempcards = this.state.cards;
                    tempcards[idx].available = true;
                    this.setState({cards: tempcards});
                } else {

                }
            }.bind(this));

            stream.on('toolRemoved', function(data){
                if(this.props.authorized){
                    var idx = Number(data.data);
                    var tempcards = this.state.cards;
                    tempcards[idx].available = false;
                    this.setState({cards: tempcards});
                } else {
                    this.props.trigger(true);
                }

            }.bind(this));

        }.bind(this));
    }

    render() {
        if(this.props.authorized) {
            return (
                <div className="container-fluid"
                     style={{"background": 'white', 'textAlign': 'center', 'height': '100%'}}>
                    <h1>Hello {this.props.user}!</h1>
                    <div className="rows" style={{'background': 'red'}}>
                        {
                            this.state.cards.map((card, i)=> {
                                return (
                                    <Card key={i} available={card.available} cardId={card.id}></Card>
                                )
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