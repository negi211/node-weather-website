
    
   const weatherForm = document.querySelector('form');
   const search = document.querySelector('input');
   const msg1 = document.querySelector('#msg-1');
   const msg2 = document.querySelector('#msg-2');
   const maincont = document.querySelector('.forecast');

   weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log("testing")
        const location  = search.value;
        msg1.textContent = 'Loading';
        msg2.textContent = '';
        if(maincont.childElementCount > 1)
        {
         maincont.firstElementChild.remove()
        }
        

        fetch('/weather?address='+location)
        .then((response)=>{
           response.json().then((data)=>{
               if(data.error)
               {
                msg1.textContent = data.error   
               }else{
                msg1.textContent = data.location;
                var z = data.forecast;  
                var datadup =  z.split('*');
                msg2.textContent = datadup[0];
                var r =  `<img src= ${datadup[1]} width =30 height =30>`;
                msg2.insertAdjacentHTML('beforebegin',r);
            
               }
            
           })
        })
   })