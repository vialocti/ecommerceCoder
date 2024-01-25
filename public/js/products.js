
const btns = document.getElementsByClassName('btnP')


const addProdutToCart= async (idP)=>{
    
    const result = await fetch(`http://localhost:8080/api/carts/65a6911282e5e24d7d9e3266/products/${idP}`, {
        
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({quantity:1})
        
    });

    if(!result){
        alert('Error No  se agrego Producto')
    }else{
        alert('Producto Agregado')
    }

}

for(let btn of btns){
    btn.addEventListener('click',(event)=>{
        addProdutToCart(btn.id)
    })
}