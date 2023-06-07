  
const imageSelect = document.querySelector('.imageSelect')
let image = document.querySelector('.image')
const ajout_image = document.querySelector('.ajout_image')
const closeBtn = document.querySelector('.closeBtn')
const formBox = document.querySelector('.formBox')
let formTitle = formBox.querySelector('h2')
let submit = formBox.querySelector('#submit')


let input_id = document.querySelector('#input_id')

imageSelect.addEventListener('change', (e)=>{
    let file = e.target.files[0]
    const url = URL.createObjectURL(file)
    image.src = url
})


// AJOUT D'Image
ajout_image.addEventListener('click', showBoxForm)
closeBtn.addEventListener('click', hiddenBoxForm)


function showBoxForm(){
    formBox.classList.add('showFormBox')
    input_id.value = null
    formTitle.innerText = 'Ajouter un article pour les chaussures'
    submit.value = 'importer'
    formBox.querySelector('form').reset()
    image.src = ''
    imageSelect.classList.remove("disableImageSelect")
    imageSelect.required = true
}

function hiddenBoxForm(){
    formBox.classList.remove('showFormBox')
    document.querySelector('.card_arctif').click()
}


// Galery

const cards = document.querySelectorAll('.cards img')
const id_image = document.querySelector('.id_image')
const image_select = document.querySelector('.image_select')
const text_card =  document.querySelectorAll('.text_card')
const ul_text = document.querySelector('.text')
const deletBtn = document.querySelector('.deletBtn')
const article_name_tag = document.querySelector('.image_infos h2')
let article_name = ''
let imageSrc = ''
let selectImg_id = null
let li_tag = ''

cards.forEach((img, i) =>{
    if(i === 0){
        img.classList.add('card_arctif')
        selectImg_id = parseFloat(document.querySelector('.firstArticle_id').id)
    }
    img.addEventListener('click',()=>{
        if(img.parentElement.parentElement.querySelector('.card_arctif')){
            img.parentElement.parentElement.querySelector('.card_arctif').classList.remove('card_arctif')
        }

        img.classList.add('card_arctif')
        ul_text.innerHTML = ''
        li_tag = ''
         selectImg_id = parseFloat(img.parentElement.querySelector('.id_image').id)
        image_select.src = img.src
        
        try{
            fetch('http://localhost:3001/collection/article_chaussures')
            .then(res => res.json())
            .then(result =>{
               const imageInfos = result.filter(vetement => vetement.id === selectImg_id )
               for (let [key, value] of Object.entries(imageInfos[0])) {
           
               let colorBg = value.toString().startsWith('#') ? value : '' 
                value = value.toString().startsWith('#') ?  '': value

               let  colorClass =  key  === 'couleur'? `
               "display: block;
               background-color: ${colorBg} ;
               width: 15px;
               height: 15px;
               border-radius: 50%;"  `
                : '';

               if(key === 'imgSrc'){
                    imageSrc =  value
                }
                if(key === 'date'){
                    value = new Date(value).toLocaleDateString()
               }

                if(key === 'nom'){
                    article_name_tag.innerText =  value
                    formBox.querySelector('#nom').value = value
                }

                if(key === 'categorie'){
                    formBox.querySelector('#categorie').value = value
                }

                if(key === 'couleur'){
                    
                    formBox.querySelector('#couleur').value = colorBg
                }   

                if(key === 'colorName'){
                    formBox.querySelector('#colorName').value = value
                }

                if(key === 'taille'){
                    formBox.querySelector('#taille').value = value

                }

                if(key === 'saison'){
                    formBox.querySelector('#saison').value = value
                }

                if(key === 'description'){
                    formBox.querySelector('#description').value = value
                }

                if(key === 'prix'){
                    formBox.querySelector('#prix').value = value
                    value = value + ' fcfa'
                }
                
                if(key !== 'imgSrc' && key !== 'id' && key !== 'onStock' ){
                    li_tag += `
                    <li class="text_card">
                        <p>${key} : 
                         <span style=${colorClass} >
                          ${value || ''}
                           </span> 
                         </p>
                    </li>
                `
                }
              }
              ul_text.insertAdjacentHTML('beforeend', li_tag)

            })
        }catch(err){
                console.log(err)
        }
    })
})

document.querySelector('.card_arctif').click()

//DETELET PRODUIT
deletBtn.addEventListener('click', (e)=>{
    e.preventDefault()
   const confirme =  window.confirm('Voulez vraiment vous supprimer le produit')
   if(confirme === true){
    let link = document.createElement('a')
    link.href= `/detelet_image/${imageSrc}/article_chaussures	/${selectImg_id}/chaussure`
    link.click()

   }else{
    console.log('no')
   }
})


//EDIT PRODUIT

const editBtn = document.querySelector('.editBtn')

editBtn.addEventListener('click', (e)=>{
   formBox.classList.add('showFormBox')
   image.src = image_select.src
    input_id.value = selectImg_id
    formTitle.innerText = 'Modifier l\'article '
    submit.value = 'modifier'
    imageSelect.classList.add("disableImageSelect")
    imageSelect.required = false

})


// MORE IMAGE TO ONE PRODUCT
const moreImage = document.querySelector('.moreImage')

moreImage.addEventListener('click', (e)=>{
    formBox.classList.add('showFormBox')
    input_id.value = null
    formTitle.innerText = 'Ajouter plus d \'article pour ce produit'
    submit.value = 'importer'
    image.src = ''
    imageSelect.classList.remove("disableImageSelect")
    imageSelect.required = true
 
 })


