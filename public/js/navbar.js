const botoncp = document.getElementById('btnCp')
const botonmp = document.getElementById('btnMp')
const botonmc = document.getElementById('btnMc')

const botonrgter = document.getElementById('btnRegister')
const botonlgin = document.getElementById('btnLogin')
const botonlgout = document.getElementById('btnLogout')




botonmc.addEventListener('click',()=>{
    location.href="http://localhost:8080/views/cart/65a6911282e5e24d7d9e3266";
})
botoncp.addEventListener('click',()=>{
    location.href="http://localhost:8080/views/product";
})

botonmp.addEventListener('click',()=>{
    location.href="http://localhost:8080/views/products?page=1";
})

botonrgter.addEventListener('click',()=>{
    location.href="http://localhost:8080/views/register";
})
botonlgin.addEventListener('click',()=>{
    location.href="http://localhost:8080/views/login";
})

botonlgout.addEventListener('click',async()=>{
    //console.log('aaa')
    const resu = await fetch('http://localhost:8080/api/sessions/logout',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            }
            });
            //console.log(resu)
            const redirect=resu.url
            window.location.href=redirect;
})


