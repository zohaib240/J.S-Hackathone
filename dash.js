import { collection, addDoc, getDocs , Timestamp , }
 from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  import { auth , db } from "./config.js";


const title=document.querySelector('#title')
const discription=document.querySelector('#discription')
const form=document.querySelector('#form')
const div=document.querySelector('#div')
let arr =[];


// data add on firestore ---->>

form.addEventListener('submit',async (event) => {
  div.innerHTML=''
   div.innerHTML=''
    event.preventDefault()
   console.log(title.value)
   console.log(discription.value)
   console.log (auth)
   try {
    const docRef = await addDoc(collection(db, "posts"), {
      Title: title.value,
      Discription: discription.value,
      uid : auth.currentUser.uid,
      dateExample: Timestamp.fromDate(new Date())

    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
    title.value='' 
  discription.value=''
  render()
})

// data get on firestore ---->>


async function getData() {
  arr.length=0
  const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
    arr.push({...doc.data(),docId:doc.id})
});
console.log(arr);
render()

const del=document.querySelectorAll('#delete')
const edit=document.querySelectorAll('#edit')


del.forEach((btn ,index)=>{
btn.addEventListener('click',()=>{
console.log('del',arr[index]);
arr.splice(index, 1)
})
})
  

edit.forEach((btn,index)=>{
  btn.addEventListener('click',async ()=>{
  console.log('edit',arr[index]);
 
  })
})
}
getData()

//  render function on screen--->>

function render() {
  arr.map((item)=>{
    div.innerHTML +=`
  <div class="card" style="width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">${item.Title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${item.Discription}</</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button type="button" id='edit' class=" mt-3 btn bg-primary btn-sm text-white">Edit</button>
      <button type="button" id='delete'class=" mt-3 btn ml-5 btn-sm bg-danger text-white">delete</button>
    </div>
  </div>
  ` 
})
const del=document.querySelectorAll('#delete')
const edit=document.querySelectorAll('#edit')


del.forEach((btn)=>{
btn.addEventListener('click',()=>{
console.log('del');
})
  
})

edit.forEach((btn)=>{
  btn.addEventListener('click',()=>{
  console.log('edit');
  })
    
  })
}














