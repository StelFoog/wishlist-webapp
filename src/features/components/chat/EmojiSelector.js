import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class EmojiSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { toggleEmojiKeyboard } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      toggleEmojiKeyboard();
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  render() {
    const { onSelect } = this.props;
    return (
      <div ref={this.setWrapperRef}>
        <Picker
          set="emojione"
          title="Pick your emoji…"
          emoji="point_up"
          onSelect={onSelect}
          style={{
            position: "absolute",
            bottom: `calc(${
              document.getElementById("chat-input").clientHeight
            }px + 5px)`,
            right: "10px"
          }}
        />
      </div>
    );
  }
}

export default EmojiSelector;
