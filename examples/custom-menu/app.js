import React from 'react'
import Autocomplete from '../../lib/index'
import { getStates, matchStateToTerm, sortStates, styles, fakeRequest } from '../utils'

let App = React.createClass({

  getInitialState () {
    return {
      unitedStates: getStates(),
      loading: false
    }
  },

  render () {
    return (
      <div>
        <h1>Custom Menu</h1>
        <p>
          While Autocomplete ships with a decent looking menu, you can control the
          look as well as the rendering of it. In this case we put headers for each
          letter of the alphabet.
        </p>
        <Autocomplete
          labelText="Choose a state from the US"
          items={this.state.unitedStates}
          getItemValue={(item) => item.name}
          onSelect={() => this.setState({ unitedStates: [] }) }
          onChange={(event, value) => {
            this.setState({loading: true})
            fakeRequest(value, (items) => {
              this.setState({ unitedStates: items, loading: false })
            })
          }}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
              id={item.abbr}
            >{item.name}</div>
          )}
          renderMenu={(items, value, style) => (
            <div style={{...styles.menu, ...style}}>
              {value === '' ? (
                <div style={{padding: 6}}>Type of the name of a United State</div>
              ) : this.state.loading ? (
                <div style={{padding: 6}}>Loading...</div>
              ) : items.length === 0 ? (
                <div style={{padding: 6}}>No matches for {value}</div>
              ) : this.renderItems(items)}
            </div>
          )}
        />
      </div>
    )
  },

  renderItems (items) {
    console.log(items)
    return items.map((item, index) => {
      var text = item.props.children
      if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
        var style = {
          background: '#eee',
          color: '#454545',
          padding: '2px 6px',
          fontWeight: 'bold'
        }
        return [<div style={style}>{text.charAt(0)}</div>, item]
      }
      else {
        return item
      }
    })
  }
})

React.render(<App/>, document.getElementById('container'))


