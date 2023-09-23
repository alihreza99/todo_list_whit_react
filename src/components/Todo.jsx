import React, {Component } from "react";
import "../Fonts/fontawesome-free-6.4.0-web/css/all.css"

export default class Todo extends Component{


    removeHandler(id){
        this.props.delete(id)
    }

    render(){
        return (
            <li><span className="name">{this.props.title}</span><button onClick={this.removeHandler.bind(this,this.props.id)} className="delete" ><i className="fa-solid fa-trash"></i></button></li>
        )
    }


}

