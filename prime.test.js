const { isPrime, nextPrime, previousPrime } = require("./prime");

describe("isPrime", () => {
    test.each([2, 3, 5, 7, 97, 7919])("%i is prime", (n) => {
        expect(isPrime(n)).toBe(true);
    });

    test.each([1, 4, 100, 7921, 9])("%i is not prime", (n) => {
        expect(isPrime(n)).toBe(false);
    });

    test("0 is not prime", () => {
        expect(isPrime(0)).toBe(false);
    });

    test("negative numbers are not prime", () => {
        expect(isPrime(-5)).toBe(false);
    });

    test.each([NaN, 7.5, Infinity])("%p is not prime", (n) => {
        expect(isPrime(n)).toBe(false);
    });

    test.each([25, 49])("%i (perfect square near the 6k±1 boundary) is not prime", (n) => {
        expect(isPrime(n)).toBe(false);
    });
});

describe("nextPrime", () => {
    test("nextPrime(100) is 101", () => {
        expect(nextPrime(100)).toBe(101);
    });

    test("nextPrime(2) is 3, not 2 itself", () => {
        expect(nextPrime(2)).toBe(3);
    });

    test.each([0, -5])("nextPrime(%i) is 2", (n) => {
        expect(nextPrime(n)).toBe(2);
    });

    test("nextPrime(7) is 11", () => {
        expect(nextPrime(7)).toBe(11);
    });
});

describe("previousPrime", () => {
    test("previousPrime(100) is 97", () => {
        expect(previousPrime(100)).toBe(97);
    });

    test("previousPrime(3) is 2", () => {
        expect(previousPrime(3)).toBe(2);
    });

    test.each([2, 1, 0, -5])("previousPrime(%i) is null", (n) => {
        expect(previousPrime(n)).toBeNull();
    });
});

describe("form integration", () => {
    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = `
            <input type="number" id="numberInput">
            <button type="button" id="submitBtn">Submit</button>
            <h2 id="result"></h2>
        `;
        require("./prime");
    });

    function submit(value) {
        document.getElementById("numberInput").value = value;
        document.getElementById("submitBtn").click();
        return document.getElementById("result").textContent;
    }

    test("100 reports next and previous primes", () => {
        expect(submit("100")).toBe(
            "No, 100 is not a prime number. The next prime number is 101 and the previous prime number is 97."
        );
    });

    test("7 reports a positive prime message with next and previous primes", () => {
        expect(submit("7")).toBe(
            "Yes, it is a prime number. The next prime number is 11 and the previous prime number is 5."
        );
    });

    test("2 has no previous prime", () => {
        expect(submit("2")).toBe(
            "Yes, it is a prime number. The next prime number is 3 and there is no previous prime number."
        );
    });

    test("1 reports no previous prime in the message", () => {
        expect(submit("1")).toBe(
            "No, 1 is not a prime number. The next prime number is 2 and there is no previous prime number."
        );
    });

    test.each(["", "abc"])("%p asks for a whole number", (value) => {
        expect(submit(value)).toBe("Please enter a whole number.");
    });
});
