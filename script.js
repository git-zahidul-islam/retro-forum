// get id from html
const readableCard = document.getElementById('readable-card');
const latestPost = document.getElementById('latest-post');
const cardCount = document.getElementById('select-card-count')



// api get data all post
const allPostLoad = async () => {
    // loading
    document.getElementById('loading').style.display = 'flex'
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const resData = await res.json()
    const data = resData.posts;


    data.forEach(data => {
        // loading
        document.getElementById('loading').style.display = 'none';
        // console.log(data)
        const newDiv = document.createElement('div');
        newDiv.classList = `flex-1 flex flex-col lg:gap-4 gap-2`
        newDiv.innerHTML = `
            <div class="flex lg:gap-6 gap-3 bg-[#F3F3F5] lg:p-5 md:p-4 p-1 lg:rounded-2xl rounded-xl">
                            <!-- image side -->
                            <div>
                                <div class="avatar">
                                    <div class="w-[72px] h-[72px] rounded-2xl">
                                        <img
                                            src="${data.image}" />
                                    </div>
                                    <div class="w-3 h-3 bg-${data.isActive ? "green-600" : "red-600"} rounded-full relative right-2"></div>
                                </div>
                            </div>
                            <!-- text site -->
                            <div class="lg:space-y-4 md:space-y-3 space-y-2 w-full">
                                <div class="flex gap-5">
                                    <p class="text-sm font-medium text-[#12132DCC] font-inter"><span># ${data.category}</span></p>
                                    <p class="text-sm font-medium text-[#12132DCC] font-inter">Author : ${data.author.name}
                                    </p>
                                </div>
                                <h1
                                    class="lg:text-xl md:text-base text-sm lg:font-bold md:font-bold font-semibold text-[#12132D]">
                                    ${data.title}</h1>
                                <p class="font-inter lg:text-base md:text-base text-sm font-normal text-[#12132D99]">${data.description}</p>
                                <div class="border-[1px] border-dashed border-[#12132D40]"></div>
                                <div class="flex justify-between">
                                    <div class="flex-1 flex items-center lg:gap-4 gap-1">
                                        <div class="flex gap-2 items-center">
                                            <img class="w-[21px] h-[19.80px]" src="icons/chat.png" alt="chat">
                                            <p>${data.comment_count}</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <img class="w-[21px] h-[19.80px]" src="icons/tabler-icon-eye.png"
                                                alt="eyes">
                                            <p>${data.view_count}</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <img class="w-[21px] h-[19.80px]" src="icons/clock.png" alt="clock">
                                            <p>${data.posted_time}min</p>
                                        </div>
                                    </div>
                                    <div class="cursor-pointer">
                                        <button onclick="readHandler('${data.title.replace("'", " ")}',${data.view_count})"><img id="read" src="icons/read-message.png" alt="read message"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        readableCard.appendChild(newDiv);
    });
};
// read handler 
const readTimes = document.getElementById('read-times');

function readHandler(title, count) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex gap-4 items-center bg-white lg:p-4 p-2 rounded-md mb-2">
                <div class="flex-1">
                    <p class="text-base lg:font-semibold font-medium text-[#12132D]">${title}</p>
                </div>
                <div class="flex items-center">
                    <img src="icons/tabler-icon-eye.png" alt="eye">
                    <p>${count}</p>
                </div>
        </div>
    `
    readTimes.appendChild(div);
    cardCount.innerText = parseInt(cardCount.innerText) + 1;
}
// search item section
const searchButton = () => {
    const searchField = document.getElementById('search-field').value;
    if (searchField) {

    }
    else {
        alert(`write text`)
    }
}


// latest post 
const latestPostLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const resData = await res.json()
    const data = resData
    data.forEach(data => {
        // console.log(data)
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="bg-white border-[1px] lg:p-6 md:p-4 p-2 rounded-2xl lg:space-y-3 md:space-y-3 space-y-1">
                    <img class="w-full h-44 rounded-2xl" src="${data.cover_image}" alt="image">
                    <div class="flex items-center gap-4">
                        <img src="icons/clock.png" alt="">
                        <p class="text-[#12132D99] lg:text-base text-sm font-normal">${data.author.posted_date ? data.author.posted_date : "No publish date"}</p>
                    </div>
                    <h2 class="lg:text-lg text-sm lg:font-extrabold font-semibold">${data.title}</h2>
                    <p class="text-base font-normal
                     text-[#12132D99]">${data.description}</p>
                    <div class="flex gap-3">
                        <img class="lg:w-11 w-8 lg:h-11 h-8 rounded-full" src="${data.profile_image}" alt="">
                        <div>
                            <p class="text-base lg:font-bold font-medium">${data.author.name}</p>
                            <p><span>${data.author.designation ? data.author.designation : "Unknown"}</span></p>
                        </div>
                    </div>
                </div>
        `
        latestPost.appendChild(newDiv);
    })
}


latestPostLoad()
allPostLoad()