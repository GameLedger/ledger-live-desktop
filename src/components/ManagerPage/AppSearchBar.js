// @flow

import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

import type { ApplicationVersion } from 'helpers/types'

import Box from 'components/base/Box'
import Space from 'components/base/Space'
import Input from 'components/base/Input'
import Search from 'components/base/Search'

import SearchIcon from 'icons/Search'
import CrossIcon from 'icons/Cross'

const CrossContainer = styled(Box).attrs({
  justify: 'center',
  px: 3,
})`
  &:hover {
    color: ${p => p.theme.colors.dark};
  }
`

type Props = {
  list: Array<ApplicationVersion>,
  children: (list: Array<ApplicationVersion>) => React$Node,
}

type State = {
  query: string,
  focused: boolean,
}

class AppSearchBar extends PureComponent<Props, State> {
  state = {
    query: '',
    focused: false,
  }

  handleChange = (query: string) => this.setState({ query })

  handleFocus = (bool: boolean) => () => this.setState({ focused: bool })

  reset = () => {
    const { input } = this
    this.setState(state => ({ ...state, query: '' }), () => input && input.focus())
  }

  input = null

  render() {
    const { children, list } = this.props
    const { query, focused } = this.state

    const color = focused ? 'dark' : 'grey'

    return (
      <Fragment>
        <Input
          innerRef={c => (this.input = c)}
          type="text"
          value={query}
          onChange={this.handleChange}
          onFocus={this.handleFocus(true)}
          onBlur={this.handleFocus(false)}
          placeholder={'Search app'}
          renderLeft={
            <Box pl={3} justify="center" color={color}>
              <SearchIcon size={16} />
            </Box>
          }
          renderRight={
            query ? (
              <CrossContainer justify="center" cursor="default" onClick={this.reset} px={3}>
                <CrossIcon size={16} />
              </CrossContainer>
            ) : null
          }
        />
        <Space of={30} />
        <Search
          fuseOptions={{
            threshold: 0.1,
            keys: ['name'],
          }}
          value={query}
          items={list}
          render={items => children(items)}
        />
      </Fragment>
    )
  }
}

export default AppSearchBar
