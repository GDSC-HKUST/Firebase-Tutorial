import {db} from './config'

export function createSuperhero(name){
    db.collection("superheroes").add({
        name: name
    })
    .then(() => {
        alert("Success")
    })
    .catch((error) => {
        console.log(error)
    })
}

export function updateSuperhero(id, newName){
    db.collection("superheroes").doc(id).update({
        name: newName
    })
    .then(() => alert("Update Success"))
}

export function deleteSuperhero(id){
    db.collection("superheroes").doc(id).delete()
    .then(() => alert("Delete Success"))
}