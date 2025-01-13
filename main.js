// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});





    console.log('Retrieved Saved Data:', savedData);

  

    const startWritingBtn = document.getElementById('startWriting');
        const loginDialog = document.getElementById('loginDialog');
        const overlay = document.getElementById('overlay');
        const loginBtn = document.getElementById('loginBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');

        // Show the dialog and overlay
        startWritingBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            loginDialog.style.display = 'block';
            overlay.style.display = 'block';
        });

        // Handle login button click
        loginBtn.addEventListener('click', () => {
            const username = usernameField.value.trim();
            const password = passwordField.value.trim();

            if (username === 'admin' && password === 'admin') {
                alert('Login successful!');
                window.location.href = 'editor.html'; // Redirect to editor.html
            } else {
                alert('Invalid ID or Password. Please try again.');
            }
        });

        // Cancel button and overlay click to close the dialog
        const closeDialog = () => {
            loginDialog.style.display = 'none';
            overlay.style.display = 'none';
            usernameField.value = '';
            passwordField.value = '';
        };
        cancelBtn.addEventListener('click', closeDialog);
        overlay.addEventListener('click', closeDialog);
  