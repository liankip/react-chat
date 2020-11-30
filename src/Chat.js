import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
    };

    this.socket = io("localhost:5000");

    console.log(`Client ${this.socket}`);

    this.socket.on("RECEIVE_MESSAGE", function (data) {
      addMessage(data);
    });

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = (ev) => {
      this.socket.emit("SEND_MESSAGE", {
        message: this.state.message,
      });
      this.setState({ message: "" });
    };
  }
  render() {
    console.log(this.state.messages);
    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="columns ">
              <div className="column is-two-thirds-mobile is-two-thirds-desktop ">
                <h1 className="title has-text-primary">Chat Room </h1>
              </div>
            </div>

            <div className="tile is-ancestor">
              <div className="tile is-8 is-vertical is-parent">
                {this.state.messages.map((message, i) => {
                  return (
                    <div key={i} className="tile is-child box">
                      <p>{message.message}</p>
                    </div>
                  );
                })}

                <div className="tile is-child">
                  <div className="field has-addons">
                    <div className="control is-expanded has-icons-left">
                      <input
                        className="input is-medium "
                        onChange={(event) =>
                          this.setState({ message: event.target.value })
                        }
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            this.sendMessage();
                          }
                        }}
                        name="mess"
                        type="text"
                        placeholder="Masukkan Pesan"
                        value={this.state.message}
                        required
                      />
                      <span className="icon is-medium is-left">
                        <i className="fas fa-keyboard"></i>
                      </span>
                    </div>
                    <div className="control">
                      <button
                        onClick={() => {
                          this.sendMessage();
                        }}
                        className="button is-medium is-primary"
                      >
                        <span className="icon is-medium">
                          <i className="fas fa-paper-plane"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Chat;
