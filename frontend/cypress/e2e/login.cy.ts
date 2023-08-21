describe("LoginForm", () => {
	it("allows the user to log in with valid credentials", () => {
		// Visit the login page
		cy.visit("/login");

		// Enter the email and password
		cy.get("#username").type("testuser@ceremedica.com");
		cy.get("#password").type("123456");

		// Click the login button
		cy.get("#login").click();

		// Wait for the login to complete
		cy.contains("Loading ...");

		// Check that the user is redirected to the environments page
		cy.url().should("include", "/environments");
	});
});
