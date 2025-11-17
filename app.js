// BabyGuard – App behaviour for index.html

document.addEventListener("DOMContentLoaded", () => {
    // Screens
    const loginScreen   = document.getElementById("login-screen");
    const parentApp     = document.getElementById("parent-app");
    const hospitalApp   = document.getElementById("hospital-app");

    // Role tabs & forms
    const roleTabs            = document.querySelectorAll(".role-tab");
    const parentLoginForm     = document.getElementById("parent-login-form");
    const hospitalLoginForm   = document.getElementById("hospital-login-form");

    // Logout buttons
    const logoutButtons = document.querySelectorAll(".logout-button");

    /* ---------------------------------
       1. ROLE SWITCHING ON LOGIN
    ---------------------------------- */
    roleTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const selectedRole = tab.getAttribute("data-role"); // "parent" or "hospital"

            // Toggle active tab
            roleTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Toggle forms
            if (selectedRole === "parent") {
                parentLoginForm.classList.add("active");
                hospitalLoginForm.classList.remove("active");
            } else {
                parentLoginForm.classList.remove("active");
                hospitalLoginForm.classList.add("active");
            }
        });
    });

    /* ---------------------------------
       2. SIMPLE LOGIN HANDLERS
       (no real auth, just navigation)
    ---------------------------------- */

    parentLoginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        showParentApp();
    });

    hospitalLoginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        showHospitalApp();
    });

    function showParentApp() {
        // Hide login, show parent dashboard
        loginScreen.classList.add("hidden");
        parentApp.classList.remove("hidden");
        hospitalApp.classList.add("hidden");

        // Ensure default parent view selected
        setActiveParentView("dashboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function showHospitalApp() {
        // Hide login, show hospital console
        loginScreen.classList.add("hidden");
        hospitalApp.classList.remove("hidden");
        parentApp.classList.add("hidden");

        // Ensure default hospital view selected
        setActiveHospitalView("overview");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ---------------------------------
       3. LOGOUT HANDLING
    ---------------------------------- */
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const role = btn.getAttribute("data-logout"); // "parent" or "hospital"

            // Show login screen again
            loginScreen.classList.remove("hidden");
            parentApp.classList.add("hidden");
            hospitalApp.classList.add("hidden");

            // Reset role tabs + forms to parent by default
            roleTabs.forEach(t => t.classList.remove("active"));
            const parentTab = document.querySelector('.role-tab[data-role="parent"]');
            if (parentTab) parentTab.classList.add("active");

            parentLoginForm.classList.add("active");
            hospitalLoginForm.classList.remove("active");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    /* ---------------------------------
       4. PARENT APP NAVIGATION
    ---------------------------------- */
    const parentMenuButtons = document.querySelectorAll(".parent-menu .menu-btn");

    parentMenuButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetView = btn.getAttribute("data-parent-view");

            // Highlight selected menu
            parentMenuButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Switch views
            setActiveParentView(targetView);
        });
    });

    function setActiveParentView(viewName) {
        const views = document.querySelectorAll(".parent-view");
        views.forEach(v => v.classList.remove("active-view"));

        const targetSection = document.getElementById(`parent-view-${viewName}`);
        if (targetSection) {
            targetSection.classList.add("active-view");
        }
    }

    /* ---------------------------------
       5. HOSPITAL APP NAVIGATION
    ---------------------------------- */
    const hospitalMenuButtons = document.querySelectorAll(".hospital-menu .menu-btn");

    hospitalMenuButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetView = btn.getAttribute("data-hospital-view");

            // Highlight selected menu
            hospitalMenuButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Switch views
            setActiveHospitalView(targetView);
        });
    });

    function setActiveHospitalView(viewName) {
        const views = document.querySelectorAll(".hospital-view");
        views.forEach(v => v.classList.remove("active-view"));

        const targetSection = document.getElementById(`hospital-view-${viewName}`);
        if (targetSection) {
            targetSection.classList.add("active-view");
        }
    }

    /* ---------------------------------
       6. INITIAL STATE
    ---------------------------------- */
    // Start with login screen visible, parent role selected by default
    loginScreen.classList.remove("hidden");
    parentApp.classList.add("hidden");
    hospitalApp.classList.add("hidden");
    parentLoginForm.classList.add("active");
});
