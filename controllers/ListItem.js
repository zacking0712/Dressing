
// Khởi tạo thẻ img

let dressUp = document.createElement('img')
let divContain = document.querySelector('.contain')
divContain.appendChild(dressUp)
dressUp.id = "dressUp"

// function thử đồ
function thuDo(e) {
    let clothes = e.target.id
    console.log(clothes);
    let img = document.getElementById("dressUp")
    img.src = clothes
    img.style.position = "absolute"
    img.style.top = "-30%"
    img.style.left = "-5%"
    img.style.zIndex = "10"
    img.style.transform = "scale(0.5)"
}

function getValueData() {
    let promise = axios({
        url: '../data/Data.json',
        method: "GET",
    })
    promise.then(function(res) {
        console.log(res);

        // Nav Item
        let nav_link = document.querySelectorAll('.nav-link')
        let data_nav = res.data.navPills
        for (let i = 0; i < nav_link.length; i++) {
            let id = nav_link[i].id
            document.getElementById(id).innerHTML = data_nav[i].showName    
        }
        

        // Show pane
        let id_pane = document.querySelectorAll('.tab-pane')
        for(let i = 0; i < id_pane.length; i++) {
            let id = id_pane[i].id
            let arrClothes = res.data.tabPanes
            let content = "";
            for (let i = 0; i < arrClothes.length; i++ ) {
                let item = arrClothes[i] 
                if (arrClothes[i].type == id) {
                    content += `
                        <div class="float-left w-25 text-center" style="padding: 20px">
                            <img class="rounded" src="${item.imgSrc_jpg}" alt="">
                            <p class="mt-3 font-weight-bold">${item.name}</p>
                            <button class="btn btn-dark" id="${item.imgSrc_png}" onclick="thuDo(event)">Thử đồ</button>
                        </div>
                    `
                }
            //   console.log(content)
                document.getElementById(id).innerHTML = content
            }

            //
        }
        
    }).catch(function(err) {
        console.log(err)
    })
}
getValueData()