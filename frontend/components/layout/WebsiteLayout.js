
import React from 'react';

class WebsiteLayout extends React.Component {
  render() {
    return (
      <div>
        <h2>I am website !</h2>
        {this.props.children}
      </div>
    );
  }
}


export default WebsiteLayout;