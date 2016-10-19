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
            cards: [],
            checkoutAmount: 0,
            unauthorized: new Set()
        }

    }

    componentDidMount() {
        var intervalId = setInterval(()=>{
            if(this.props.initState.finished){
                var count = 0;
                for(var itemId in this.props.initState.status){
                    if(this.props.initState.status[itemId]){
                        count += 1;
                    }
                    this.setState({cards: [...this.state.cards, {id: itemId, available: this.props.initState.status[itemId]}]});
                }
                this.setState({checkoutAmount: count});
                clearInterval(intervalId);
            }
        }, 1000);

        var particle = new Particle();

        particle.getEventStream({ deviceId: '1e0021000347343337373738', auth: '4084f1aedf6260ab97aa59fb3bb0d5bce4cf9584'}).then(function(stream) {
            stream.on('toolReturned', function(data) {
                var idx = Number(data.data);
                console.log('tool returned: ' + idx);
                var tempcards = this.state.cards;
                tempcards[idx].available = true;
                this.setState({cards: tempcards});
                if(!this.props.authorized) {
                    var idx = Number(data.data);
                    console.log('unauthorized return: ' + idx);
                    var temp = new Set(this.state.unauthorized);
                    temp.delete(idx);
                    console.log(temp);
                    this.setState({unauthorized: temp});
                    if(temp.size == 0) {
                        this.props.trigger(false);
                    }
                }
                this.setState({checkoutAmount: this.state.checkoutAmount - 1});
                this.props.updateCheckoutCount(this.state.checkoutAmount);
            }.bind(this));

            stream.on('toolRemoved', function(data){
                var idx = Number(data.data);
                var tempcards = this.state.cards.slice();
                tempcards[idx].available = false;
                this.setState({cards: tempcards});
                console.log('tool removed: ' + idx);
                if(!this.props.authorized) {
                    var idx = Number(data.data);
                    console.log('unauthorized remove: ' + idx);
                    var temp = new Set(this.state.unauthorized);
                    temp.add(idx);
                    console.log(temp);
                    this.setState({unauthorized: temp});
                    this.props.trigger(true);
                }
                this.setState({checkoutAmount: this.state.checkoutAmount + 1});
                this.props.updateCheckoutCount(this.state.checkoutAmount);
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