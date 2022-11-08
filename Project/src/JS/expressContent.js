//태그에 알맞은 컨텐츠를 넣어주는 메서드
//target = year+country
export function expressContent(target) {
    const imgTag = document.querySelector('img');
    imgTag.setAttribute('src', './src/images/'+target+'.jpg');
    const cTitle = document.querySelector('.content-title');
    const cExplain = document.querySelector('.content-explain');
    cTitle.innerHTML = ttexts[target];
    cExplain.innerHTML = etexts[target];
}

//TitleTexts 맵 : 타이틀에 들어가는 텍스트를 저장하는 맵
var ttexts = {
    '2022USA'    : "미국 2022년 7월 11일<br>제임스웹 최초의 사진이 공개되다",
    '2022RUSSIA' : "러시아 2022년 2월 24일<br>러시아, 우크라이나에 침공하다",
    '2022KOREA'  : "대한민국 2022년 6월 21일<br>누리호 2차 시험 발사 성공하다",
    '2002KOREA'  : "대한민국 4강 신화",
    '2002MEXICO' : "멕시코 타코 맛있지"
}
//ExpainTexts 맵 : 설명칸에 들어가는 텍스트를 저장하는 맵
var etexts = {
    '2022USA'    : "지난 21-12-25에 발사된 제임스 웹 우주 망원경에서 JWST Preview행사에서 최초의 JWST 풀 컬러 이미지인 SMACS 0723 은하단 사진을 공개하였다.",
    '2022RUSSIA' : "러시아의 대통령 블라디미르 푸틴이 특별 군사작전을 개시 명령을 선언한 후 러시아가 우크라이나를 침공하였다. 이는 21세기 유럽 대륙에서 처음으로 발생한 대규모 전면전이다.",
    '2022KOREA'  : "전라남도 고흥에 있는 나로우주센터에서 시행된 누리호 2차 시험 발사가 최종 성공하였다. 이로써 대한민국은 1톤 이상의 페이로드를 우주궤도에 올려놓을 수 있는 세계 7번째 국가가 되었다."
}