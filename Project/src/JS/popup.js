const modal = document.getElementById("modal");
const closeBtn = modal.querySelector(".close-area")

export function modalOn() {
    modal.style.display = "flex"
}
function modalOff() {
    modal.style.display = "none"
}

//모달창 꺼뜨리기
//모달-오버레이 구역을 클릭하면 모달창 닫기
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})
//X버튼 구역을 클릭하면 모달창 닫기
closeBtn.addEventListener("click", e => {
    modalOff()
})