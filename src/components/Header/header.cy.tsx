import React from 'react'
import Header from './index'
import { ReduxProvider } from '@/redux/provider'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReduxProvider><Header /></ReduxProvider>)
  })
})