import { collection, addDoc, getDocs , Timestamp ,deleteDoc ,doc ,updateDoc  }
 from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  import { auth , db } from "./config.js";


const title=document.querySelector('#title')
const discription=document.querySelector('#discription')
const form=document.querySelector('#form')
const div=document.querySelector('#div')
let arr =[];




// data get on firestore ---->>


async function getData() {
  arr.length=0
  const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
    arr.push({...doc.data(), id:doc.id})
});
console.log(arr);
render()

}
getData()



//  render function on screen--->>

function render() {
  div.innerHTML=''
  arr.map((item)=>{
    div.innerHTML +=`
  <div class="card" style="width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">${item.Title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${item.Discription}</</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button type="button"id='delete'  class="delete  mt-3 btn ml-5 btn-sm bg-danger text-white">delete</button>
      <button type="button" id='edit' class="edit  mt-3 btn bg-primary btn-sm text-white">Edit</button>
    </div>
  </div>
  ` 
 
// delete edit option -----

const del_manjan=document.querySelectorAll('.delete')
const edit=document.querySelectorAll('.edit')


del_manjan.forEach((btn, index) => {
  btn.addEventListener('click', async () => {
    console.log('dfel',index);
     await deleteDoc(doc(db, "posts", arr[index].id));
      arr.splice(index, 1)
      render()
  })
})



edit.forEach((btn,index)=>{
  btn.addEventListener('click',async()=>{
  console.log('edit',index);
  let update = prompt('enter new title', arr[index].Title)
  const washingtonRef = doc(db, "posts", arr[index].id);

  await updateDoc(washingtonRef, {
    Tilte:update 
});
    arr[index].Title = update
render()
  })  
  })
})
}
render()


// data add on firestore ---->>

form.addEventListener('submit',async (event) => {
  div.innerHTML=''
   event.preventDefault()
  console.log(title.value)
  console.log(discription.value)
  try {
   const docRef = await addDoc(collection(db, "posts"), {
     Title: title.value,
     Discription: discription.value,
     dateExample: Timestamp.fromDate(new Date())
   });
   arr.push({
     Title: title.value,
     Discription: discription.value,
     dateExample: Timestamp.fromDate(new Date()),
     id : docRef.id
   })
   render()
   console.log("Document written with ID: ", docRef.id);
 } catch (e) {
   console.error("Error adding document: ", e);
 }
   title.value='' 
 discription.value=''

})













