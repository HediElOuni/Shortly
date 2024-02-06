function toggleNav() {
    const navLinks = document.querySelector(".h-navs");
    const navButton = document.querySelector(".nav-btn");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
        navButton.innerHTML = "☰";
    } else {
        navLinks.style.display = "flex";
        navButton.innerHTML = "⨉";
    }
}
document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const apiUrl = "https://cleanuri.com/api/v1/shorten";
    const longUrl = document.getElementById('longUrl').value;

    const encodedUrl = encodeURIComponent(longUrl);

    fetch(apiUrl, {
        method: 'POST',
        body: `url=${encodedUrl}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => {
            const shortUrl = data.result_url;
            document.getElementById('shortenedUrl').innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
            document.getElementById('links').style.display = 'block';
            function copyText() {
                navigator.clipboard.writeText(shortUrl)
            }
        })
        .catch(
            document.getElementById('longUrl').style.border = '2px solid hsl(0, 87%, 67%)',
            document.getElementById('err').style.display = 'block',
            document.getElementById('err').innerText = 'Please add a valid link'
        );
});