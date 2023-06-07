const card_image = document.querySelectorAll('.card')
const recherche = document.querySelector('#recherche')

recherche.addEventListener('input', ({target})=>{
    let value = target.value
    for(const card of card_image){
        const productName = card.querySelector('.productName')
        const category = card.querySelector('.category')
        const nom = card.querySelector('.nom')

        

      if(productName.innerText.toLowerCase().includes(value.toLowerCase()) ||
        category.innerText.toLowerCase().includes(value.toLowerCase()) ||
        nom.innerText.toLowerCase().includes(value.toLowerCase()) 

      
      ){
       productName.parentElement.style.display = 'flex'
      }else{
       productName.parentElement.style.display = 'none'

      }
    }
})
