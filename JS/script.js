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
    });
};


const generateOtp = () =>{
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    const otpEle = document.querySelector('#generated-otp');
    otpEle.innerHTML = `
          <p>Your OTP : <b class='border p-1 rounded-xl'>${generatedOtp}</b></p>
    `

}



const otpContainer = () =>{
  tackleOtpBoxes();
  setTimeout(generateOtp, 2000);
};


otpContainer();