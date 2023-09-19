
export async function getAllWorks() {
    try {
        const data = await fetch("http://localhost:5678/api/works");
        return data.json();
    } 
    catch (error) {
        return error;
    }
}
const works= await getAllWorks();
console.log(works);

const section= document.getElementById("portfolio");
console.log(section);

/*Button du connextion*/

const modifyButton  = document.getElementById("modifyButton");
const modifierUn = document.getElementById('modifier-1');
const modifierDeux = document.getElementById('modifier-2')
const loginButton = document.getElementById("loginButton");
const topBordure = document.querySelector(".top-bordure");

if (localStorage.getItem("token")) {
    loginButton.textContent = 'logout';
    modifyButton.style.display ="block";
    topBordure.style.display="block";
    modifierUn.style.display ="block";
    modifierDeux.style.display ="block";
} else {
    loginButton.textContent = 'login';
    modifyButton.style.display = "none";
    topBordure.style.display = "none";
}
loginButton.addEventListener("click", (e) => {
           if(localStorage.getItem('token')) {
            localStorage.removeItem('token');
            loginButton.textContent = 'login';
            modifyButton.style.display = "none";
            topBordure.style.display = "none";
            modifierUn.style.display ="none";
            modifierDeux.style.display ="none";
            e.preventDefault();
           } else {
            localStorage.setItem(JSON.stringify(token));
            loginButton.textContent = 'logout';
            modifyButton.style.display ="block";
            modifierUn.style.display ="block";
            modifierDeux.style.display ="block";
    } 
        });

        /* Creation Gallery */

async function  displayWorks() {
    const works= await getAllWorks();
    console.log(works);
   for (let i=0; i<works.length; i++) {
    const figure = document.createElement("figure");
figure.setAttribute("data-id", works[i].id);
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = works[i].title;
    image.setAttribute("src", image.src);
    figure.appendChild(image);
    figure.appendChild(figcaption);
   document.querySelector(".gallery").appendChild(figure);
}};
displayWorks();

/* Filter */

let selectedCategory = null;
let filtresItems = document.getElementsByClassName('filtre-item');
let onClick = function (event) {
  event.preventDefault();
  for (let i = 0; i < filtresItems.length; i++) {
    filtresItems[i].classList.remove('active');
  }
  event.currentTarget.classList.add('active');
};
for (let i = 0; i <filtresItems.length; i++) {
    filtresItems[i].addEventListener('click', onClick, false);
};
const filtreTous = document.getElementById("tous");
filtreTous.addEventListener("click", async function(){
    const works= await getAllWorks();
    console.log(works);
    selectedCategory = null;
    document.querySelector(".gallery").innerHTML = "";
    for (let i=0; i<works.length; i++){
        let categoryId = works[i].categoryId;
        if(categoryId){
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = works[i].title;
    image.setAttribute("src", image.src);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    document.querySelector(".gallery").appendChild(figure);
        }
    }
})
const filtreObjets = document.getElementById("objets");
    filtreObjets.addEventListener("click", function(){
    selectedCategory = 1;
    filterWorks(1)
    })
    const filtreAppartement = document.getElementById("appartements");
    filtreAppartement.addEventListener("click", function(){
    selectedCategory = 2;
    filterWorks(2)
    })
    const filtreHotelsrestaurants = document.getElementById("hotelsrestaurants");
    filtreHotelsrestaurants.addEventListener("click", function(){
        selectedCategory = 3;
    filterWorks(3)
    })
 async function filterWorks(identifiant){
    const works= await getAllWorks();
    console.log(works);
     document.querySelector(".gallery").innerHTML = "";
        for (let i=0; i<works.length; i++){
            let categoryId = works[i].categoryId;
            if(categoryId == identifiant){
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = works[i].title;
    image.setAttribute("src", image.src);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    document.querySelector(".gallery").appendChild(figure);
    }
}};

/* Ajoute fenetre modale */

const modal = document.querySelector("#modal");
const openButton = document.querySelector("#modifyButton");
const closeButton = document.querySelector(".close");
const closedeuxButton = document.querySelector(".close2");
const view1 = document.querySelector(".view-1");
const view2 = document.querySelector(".view-2");
const submitButton = document.querySelector("#submit_modale");
    async function showGallery() {
        const works = await getAllWorks();
       const modalGallery = document.querySelector("#modal-gallery");
       modalGallery.innerHTML = "";
      
       for (let i=0; i<works.length; i++) {
           const figure = document.createElement("figure");
           const trashIcon = document.createElement("i");
           trashIcon.classList.add("my-icon-class");
           trashIcon.classList.add("fas");
           trashIcon.classList.add("fa-trash-alt");
           trashIcon.dataset.id=  works[i].id;
           figure.appendChild(trashIcon);
           const image = document.createElement("img");
           image.src = works[i].imageUrl;
           const figcaption = document.createElement("figcaption");
           figcaption.innerText = works[i].title;
           image.setAttribute("src", image.src);
           figure.appendChild(image);
           figure.appendChild(figcaption);
           figcaption.innerText = "éditer";
           document.querySelector("#modal-gallery").appendChild(figure);
        if (i === 0) { 
                const trashIcon2 = document.createElement("i");
                trashIcon2.classList.add("my-icon-class2");
                trashIcon2.classList.add("fa-sharp");
                trashIcon2.classList.add("fa-solid");
                trashIcon2.classList.add("fa-up-down-left-right");
                figure.appendChild(trashIcon2);
                }}
                
/* Supprimer les traveux */   
     
async function deleteWork(imageId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, { 
            method: "DELETE",
            headers: { 'Authorization': 'Bearer '+ localStorage.getItem('token'),
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
             throw new Error('Failed to delete resource');
        }
    } catch (error) {
        console.error(error);
    }}
const trashIcons = document.querySelectorAll(".my-icon-class"); 
trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener("click", function(e) {
        e.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) {
            const imageId=e.target.dataset.id
            e.target.parentElement.remove();
            deleteWork(imageId);
            const modalGallery = document.querySelector("#modal-gallery");
            modalGallery.innerHTML = "";
            showGallery();
            document.querySelector(".gallery").innerHTML="";
            displayWorks();
           }
            else {
            alert("L'élément n'a pas été supprimé.");
        }
       
    })
})
}

/* Ajouter images */

const form = document.querySelector(".ajout-img");
const imageLabel =document.querySelector(".ajoutimage")
const button = document.querySelector("#upload");
const buttonImage = document.querySelector("#button-image");
const titreInput = document.querySelector("#input-inf");
const selectCategory = document.querySelector("#categorie-inf");
const imgVisible = document.querySelector('#img-visible');
const errorTitre = document.querySelector("#error-title");
const errorImage = document.querySelector('#errorImg');
const errorCategorie = document.querySelector("#error-categorie");
buttonImage.addEventListener('change', event => {
    const file = event.target.files[0];
    imgVisible.src = URL.createObjectURL(file);
    document.querySelector('.espace-ajout').style.display = 'none';
    imgVisible.style.display = 'block';
    errorImage.style.display = 'none';
    });
    titreInput.addEventListener('input', () => {
        errorTitre.style.display = "none";
    });
    
    selectCategory.addEventListener('input', () => {
        errorCategorie.style.display = "none";
    });
form.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image',buttonImage.files[0]);
        formData.append('title',titreInput.value);
        formData.append('category',selectCategory.value);
        console.log(formData);
        let isValid = true;
        if (!buttonImage.files[0]) {
        errorImage.style.display ="block";
        errorImage.style.color = 'red';
        isValid = false;
        }
        if (!titreInput.value) {
            errorTitre.style.display ="block";
            errorTitre.style.color = 'red';
            isValid = false;
        }
        if (!selectCategory.value) {
            errorCategorie.style.display = "block";
            errorCategorie.style.color ="red";
            isValid = false;
        }
        if (isValid) {
    try {
          console.log('Données du formulaire:', formData);
          const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Accept': 'application/json',
            }
    })
          console.log('Réponse de l\'API:', response);
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
       
          }
          const data = await response.json();
          console.log('Formulaire envoyé avec succès:', data.id);
          view2.style.display = 'none'
           view1.style.display = 'block'
            const newFigure = document.createElement('figure');
            newFigure.setAttribute('data-id', data.id);
            const newImage = document.createElement('img');
            newImage.src = URL.createObjectURL(form.querySelector('#button-image').files[0]);
            newFigure.appendChild(newImage);
            const newTitle = document.createElement('figcaption');
            newTitle.textContent = form.querySelector('input[name="titre"]').value;
            newFigure.appendChild(newTitle);
            document.querySelector("#modal-gallery").appendChild(newFigure)
            showGallery();
            document.querySelector('.gallery').appendChild(newFigure)
    } catch (error) {
        console.error('Erreur:', error);
         alert('Erreur lors de l\'envoi du formulaire');
        }
}
    })
    
const deleteButton = document.querySelector(".delete")
const modalGallery = document.querySelector("#modal-gallery");
deleteButton.addEventListener("click", function(event){
    event.preventDefault();
    modalGallery.innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    
})


openButton.addEventListener("click", async function(event) {
    event.preventDefault();
            modal.style.display = "block";
           await showGallery();
        });
        
        document.getElementById('modifier-1').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'block';
            showGallery();
        });
        
        document.getElementById('modifier-2').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'block';
            showGallery();
        });
        
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    view1.style.display = "none";
    view2.style.display = "block";
    document.querySelector('.espace-ajout').style.display = '';
    imgVisible.style.display = '';
    titreInput.value = "";
    selectCategory.value = "";
    imgVisible.src = "";
    errorImage.style.display = 'none';
    errorTitre.style.display ="none";
    errorCategorie.style.display ="none";

   });
closeButton.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = null;
  })
closedeuxButton.addEventListener("click", function(event) {
    event.preventDefault();
    view2.style.display = "none";
    view1.style.display = "block";
    })

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
})
