let generatedOtp;

const tackleOtpBoxes = () =>{
    const boxes = document.querySelector('#otp-box-list');
    boxes.addEventListener('input', (e) =>{
        const target = e.target;
        const value = target.value;

        if(isNaN(value)){
            target.value ='';
            return;
        }

        const nextElement = target.nextElementSibling;
        if(nextElement){
            nextElement.focus();
        }
        validateOtp();
    });
};


const generateOtp = () =>{
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    const otpElem = document.querySelector('#generated-otp');
    otpElem.innerHTML = `
          <p>Your OTP : <b class='border p-1 rounded-xl'>${generatedOtp}</b></p>
    `

}

const validateOtp = () =>{
    let typedNumber = '';
    const otpBoxList = document.querySelector('#otp-box-list');
    [...otpBoxList.children].forEach((elem) =>{
        typedNumber = typedNumber + elem.value;
        
    });
    
    const result = (generatedOtp === parseInt(typedNumber, 10));
    const otpValidateMsg = document.querySelector('#otp-validate-msg');
    if(result){
        otpValidateMsg.innerText = `OTP has been validate successfully`;
        otpValidateMsg.style.backgroundColor = 'green';
        
    }else{
        otpValidateMsg.innerText = `OTP is Invalid`;
        otpValidateMsg.style.backgroundColor = 'red';
    }
}

const otpContainer = () =>{
  tackleOtpBoxes();
  setTimeout(generateOtp, 2000);
};


otpContainer();