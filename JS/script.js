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


const otpContainer = () =>{
  tackleOtpBoxes();
};


otpContainer();