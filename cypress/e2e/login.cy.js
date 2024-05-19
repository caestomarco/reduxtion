/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/auth/login');
    });

    it('should display login page correctly', () => {
        cy.get('input[placeholder="Masukkan email"]').should('be.visible');
        cy.get('input[placeholder="Masukkan kata sandi"]').should('be.visible');
        cy.get('button')
            .contains(/^Masuk$/)
            .should('be.visible');
    });

    it('should display alert when email is empty', () => {
        cy.get('button')
            .contains(/^Masuk$/)
            .click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('"id" is not allowed to be empty');
        });
    });

    it('should display alert when password is empty', () => {
        cy.get('input[placeholder="Masukkan kata sandi"]').type('testuser');

        // klik tombol login tanpa mengisi password
        cy.get('button')
            .contains(/^Masuk$/)
            .click();

        // memverifikasi window.alert untuk menampilkan pesan dari API
        cy.on('window:alert', (str) => {
            expect(str).to.equal('"password" is not allowed to be empty');
        });
    });

    it('should display alert when email and password are wrong', () => {
        // mengisi email
        cy.get('input[placeholder="Masukkan email"]').type('testuser');

        // mengisi password yang salah
        cy.get('input[placeholder="Masukkan kata sandi"]').type('wrong_password');

        // menekan tombol Login
        cy.get('button')
            .contains(/^Masuk$/)
            .click();

        // memverifikasi window.alert untuk menampilkan pesan dari API
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Email or password is wrong');
        });
    });

    it('should display homepage when email and password are correct', () => {
        // mengisi email
        cy.get('input[placeholder="Masukkan email"]').type('another@gmail.com');

        // mengisi password
        cy.get('input[placeholder="Masukkan kata sandi"]').type('123456');

        // menekan tombol Login
        cy.get('button')
            .contains(/^Masuk$/)
            .click();

        // memverifikasi bahwa elemen yang berada di homepage ditampilkan
        cy.get('h2')
            .contains(/^Daftar Diskusi$/)
            .should('be.visible');
        cy.get('div').contains('another').should('be.visible');
    });
});
