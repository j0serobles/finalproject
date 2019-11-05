import React, { Component } from "react";
import PropTypes from "prop-types";
import './style.css';
import {   InputGroup,  InputGroupAddon } from 'reactstrap';

export class AppAutocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState(
    {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    }, this.props.handleOnClick(e.currentTarget.innerText));

  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      }, this.props.handleOnClick(filteredSuggestions[activeSuggestion]));
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="list-group">
            {filteredSuggestions.map((suggestion, index) => {
              let classNameString;

              if (index === activeSuggestion) {
                classNameString = "list-group-item list-group-item-action active";
              }
              else (classNameString = "list-group-item list-group-item-action" )

              return (
                <button className={classNameString}
                        key={suggestion} 
                        onClick={onClick}>
                  {suggestion}
                </button>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>

      <InputGroup >
        <InputGroupAddon addonType="prepend">{this.props.label}</InputGroupAddon>
        <input
          className="text form-control"
          aria-label="itemDesc" 
          aria-describedby="itemDesc"
          type="search"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </InputGroup>
        
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default AppAutocomplete;
