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
        otpValidateMsg.classList.remove('border', 'border-red-400', 'text-red-400');
        otpValidateMsg.classList.add('border', 'border-green-400', 'text-green-400');
    } else {
        otpValidateMsg.innerText = `OTP is Invalid`;
        otpValidateMsg.classList.remove('border', 'border-green-400', 'text-green-400');
        otpValidateMsg.classList.add('border', 'border-red-400', 'text-red-400');
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

const otpContainer = () => {
    tackleOtpBoxes();
    setTimeout(generateOtp, 2000);
};

otpContainer();
