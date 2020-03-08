import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: '',
            messages: []
        };

        this.socket = io('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = ev => {
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div>
                <section className="section">
                    <div className="container">
					{this.state.messages.map(message => {
						return (
						<div class="card">
							<div class="card-content">
								<div class="title">
									{message.message}
								</div>
							</div>
						</div>
						)
					})}
                    </div>
                </section>
                <input className="chat_input input input is-medium is-primary" onChange={event => this.setState({message: event.target.value})} onKeyPress={event => { if (event.key === 'Enter') { this.sendMessage() } }} type="text" placeholder="Masukkan Pesan" value={this.state.message} />
            </div>
        );
    }
}

export default Chat;