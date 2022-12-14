import modal from '../Components/Modal'

class LoginPage {

    constructor() {
        this.modal = modal
    }
    
    go(lat = '23,65348305912567', long = '-47,12653989264629') {
        cy.visit('/', this.mockLocation(lat, long))
    }

    form(user) {
        if (user.instagram) cy.get('input[name=instagram]').type(user.instagram)
        if (user.password) cy.get('input[name=password]').type(user.password)
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    goToSignup() {
        cy.contains('button', 'Cadastrar-se').click()
    }

    mockLocation(latitude, longitude) {
        return {
            onbeforeunload(win) {
                cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb,err)=> {
                    if (latitude && longitude) {
                        return cb({coord: {latitude, longitude}})
                    }
                    throw err({code: 1})
                });
            }
        }
        
    }
}

export default new LoginPage()
