document.getElementById("submitBtn").addEventListener("click", function () {
    const num = parseInt(document.getElementById("numberInput").value, 10);
    const result = document.getElementById("result");

    if (isPrime(num)) {
        result.textContent = "Yes, it is a prime number.";
    } else {
        const previous = previousPrime(num);
        const previousText = previous === null
            ? "there is no previous prime number"
            : `the previous prime number is ${previous}`;
        result.textContent = `No, ${num} it is not a prime number. The next prime number is ${nextPrime(num)} and ${previousText}.`;
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

function nextPrime(n) {
    let candidate = n + 1;
    while (!isPrime(candidate)) {
        candidate++;
    }
    return candidate;
}

function previousPrime(n) {
    let candidate = n - 1;
    while (candidate >= 2) {
        if (isPrime(candidate)) return candidate;
        candidate--;
    }
    return null;
}