let generatedOtp;
let intervalId;  // store interval id globally
let timeoutId;   // store timeout id globally

const tackleOtpBoxes = () => {
    const boxes = document.querySelector('#otp-box-list');
    boxes.addEventListener('input', (e) => {
        const target = e.target;
        const value = target.value;

        if (isNaN(value)) {
            target.value = '';
            return;
        }

        const nextElement = target.nextElementSibling;
        if (nextElement) {
            nextElement.focus();
        }

        validateOtp();
    });
};

const generateOtp = () => {
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    const otpElem = document.querySelector('#generated-otp');
    otpElem.innerHTML = `<p>Your OTP : <b>${generatedOtp}</b></p>`;
    expiredOtp();
};

const validateOtp = () => {
    let typedNumber = '';
    const otpBoxList = document.querySelector('#otp-box-list');
    [...otpBoxList.children].forEach((elem) => {
        typedNumber += elem.value;
    });

    const result = (generatedOtp === parseInt(typedNumber, 10));
    const otpValidateMsg = document.querySelector('#otp-validate-msg');
    const expireOtpElem = document.querySelector('#expired-otp');

    if (result) {
        // ✅ Clear timeout and interval
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        // ✅ Hide expiration message
        expireOtpElem.innerHTML = '';

        otpValidateMsg.innerText = `OTP has been validated successfully`;
        otpValidateMsg.classList.remove('border', 'border-red-400', 'text-red-400', 'mt-10', 'text-xl', 'font-semibold', 'p-2', 'rounded-lg', 'inline-block');
        otpValidateMsg.classList.add('border', 'border-green-400', 'text-green-400', 'mt-10', 'text-xl', 'font-semibold', 'p-2', 'rounded-lg', 'inline-block');
    } else {
        otpValidateMsg.innerText = `OTP is Invalid`;
        otpValidateMsg.classList.remove('border', 'border-green-400', 'text-green-400', 'mt-10', 'text-xl', 'font-semibold', 'p-2', 'rounded-lg', 'inline-block');
        otpValidateMsg.classList.add('border', 'border-red-400', 'text-red-400', 'mt-10', 'text-xl', 'font-semibold', 'p-2', 'rounded-lg', 'inline-block');
    }
};

const expireOtpElem = document.querySelector('#expired-otp');

const expiredOtp = () => {
    const totalTime = 15000;
    const interval = 1000;

    let slice = totalTime / interval;

    // ✅ Save interval and timeout IDs
    intervalId = setInterval(() => {
        expireOtpElem.innerHTML = `<p class='bg-white text-black inline-block p-2 rounded-lg'>Your OTP will expire in <span class='text-red-600 font-bold'>${slice}</span> seconds</p>`;
        slice--;
    }, interval);

    timeoutId = setTimeout(() => {
        expireOtpElem.innerHTML = `<p class='bg-white inline-block p-2 text-red-500 font-bold rounded-lg'>OTP Expired</p>`;
        clearInterval(intervalId);
        generateOtp(); // regenerate OTP
    }, totalTime);
};


const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', () => {
    // 🔁 Stop any running timers
    clearInterval(intervalId);
    clearTimeout(timeoutId);

    // 🔁 Clear OTP input boxes
    const inputs = document.querySelectorAll('#otp-box-list input');
    inputs.forEach(input => input.value = '');

    // 🔁 Clear validation message and classes
    const otpValidateMsg = document.querySelector('#otp-validate-msg');
    otpValidateMsg.innerText = '';
    otpValidateMsg.className = ''; // reset all styling

    // 🔁 Clear expiration timer message
    expireOtpElem.innerHTML = '';

    // 🔁 Reset OTP display with loading animation
    const otpElem = document.querySelector('#generated-otp');
    otpElem.innerHTML = `<span class="loading loading-dots loading-lg"></span>`;

    // 🔁 Generate a new OTP
    generateOtp();

    // 🔁 Focus on the first input box
    if (inputs[0]) inputs[0].focus();
});


const otpContainer = () => {
    tackleOtpBoxes();
    setTimeout(generateOtp, 2000);
};

otpContainer();
