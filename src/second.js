import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Context = React.createContext();

class Container extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shown: true,
    };

    this.toggleContainer = this.toggleContainer.bind(this)
  }

  componentWillMount() {
    this.toggleContainer(true);
  }

  toggleContainer(shown = true) {
    this.setState({
      shown,
    });
  }

  render() {
    return (
      <Context.Provider value={this.toggleContainer}>
        {this.state.shown ? this.props.children : null}
      </Context.Provider>
    );
  }
}

function Hide(props) {
  return (
    <Context.Consumer>
      {toggleContainer => (
        <HideSpan
          toggleContainer={toggleContainer}
        >
          {props.children}
        </HideSpan>
      )}
    </Context.Consumer>
  );
}


class HideSpan extends PureComponent {
  static propTypes = {
    toggleContainer: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.hideContainer = this.hideContainer.bind(this);
  };

  hideContainer() {
    this.props.toggleContainer(false);
  };

  render() {
    return (
      <span
        onClick={this.hideContainer}
      >
        {this.props.children}
      </span>
    );
  }
}


ReactDOM.render(
  <div>
    <h3>Case 1</h3>
    <Container>
      Don't forget to kill all humans! <Hide>(close)</Hide>
    </Container>

    <h3>Case 2</h3>
    <Container>
      <ul>
        <li><b>Phase 1</b>: Write some code</li>
        <li>???</li>
        <li><b>Phase 3</b>: Profit</li>
        <li><Hide>or forget it and live a full life</Hide></li>
      </ul>
    </Container>

    <h3>Case 3</h3>
    <Container>
      What has been seen cannot be unseen!
    </Container>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
