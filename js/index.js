let itemTemplate="<div class='item'>{{class}}<h5>({{num}}){{date}}</h5><h5>{{title}}</h5><hr/><h6>地點：{{address}}</h6><h6>位置：{{place}}</h6></div>"
let itemurl="https://opendata.khcc.gov.tw/public/OD_art_program.ashx?SDate=2019/02/09&EDate=2019/08/09"
let itemdata
$(function(){
  $("a[href='#activity']").click(function(){
    $("html,body").animate({
      scrollTop: $("#activity").offset().top
    },800)
  })
})
$.ajax({
  url: itemurl,
  beforeSend: function(){
    $("#loading").append('<h4 id="load">載入中....</h4>')
  },
  complete: function(){
				$("#load").remove()
	},
  success: function(res){
    itemdata= JSON.parse(res)
    for(let i=0;i<itemdata.length;i++){
      let item= itemdata[i]
      let nowclass
      if(item.PRGTICKET=="免票"){
        nowclass='<div class="tag">免費</div>'
      }else{
        nowclass=''
      }
      let nowItem= itemTemplate.replace("{{date}}",item.PRGDATE)
                                    .replace("{{title}}",item.PRGNAME)
                                    .replace("{{address}}",item.ORGNAME)
                                    .replace("{{place}}",item.PRGPLACE)
                                    .replace("{{num}}",i+1)
                                    .replace("{{class}}",nowclass)
      $("#itemlist").append(nowItem)
    }
  }
})