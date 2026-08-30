document.getElementById("submitBtn").addEventListener("click", function () {
    const num = parseInt(document.getElementById("numberInput").value, 10);
    const result = document.getElementById("result");

    if (isPrime(num)) {
        result.textContent = "Yes, it is a prime number.";
    } else {
        result.textContent = "No, it is not a prime number";
    }
});

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}