//Firebase에서 컨텐츠들을 가져와서 모달창에 띄워주는 스크립트

import { db, storage } from './config.js';
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";


export async function getData(target){
    //모달창 선택
    const imgTag = document.querySelector('img');
    const cTitle = document.querySelector('.content-title');
    const cExplain = document.querySelector('.content-explain');

    //db에서 컨텐츠 가져오기
    const docRef = doc(db, "contents", target);
    const docSnap = await getDoc(docRef);

    //모달창 초기화(로딩 이미지, 컨텐츠)
    imgTag.setAttribute('src', './src/images/loading.gif');
    cTitle.innerHTML = "";
    cExplain.innerHTML = "";

    //storage에서 이미지 URL로 가져오기
    await getDownloadURL(ref(storage, target+".jpg"))
    .then((url) => {
        imgTag.setAttribute('src', url);
    }).catch((error)=>{
        console.log(error);
    });

    if(docSnap.exists()){
        let content = docSnap.data();
        cTitle.innerHTML = content['title'];
        cExplain.innerHTML = content['subtitle'] + content['document'];
    }else{
        console.log("No such document!");
        cTitle.innerHTML = "404 NOTFOUND";
    }

    
}