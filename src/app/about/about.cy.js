import AboutPage from './page'

describe('<AboutPage />', () => {
    it('should render and display expected content', () => {
        // Mount the React component for the About page
        cy.mount(<AboutPage />)

        // The new page should contain an h1 with "About page"
        cy.get('h1').contains('About Page')
    })
})