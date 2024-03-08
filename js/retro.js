const loadAllPost = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);
    displayPosts(posts);
}
loadAllPost();

const loadPost = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    console.log(data);
    const posts = data.posts;
    console.log(posts);
    displayPosts(posts);
}



const displayPosts = (posts) => {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.textContent = ''

    posts.forEach(post => {   
        const postCard = document.createElement('div')
        postCard.classList =`flex flex-col md:flex-row p-10 gap-6 rounded-3xl bg-[#F3F3F5] mb-5`
        let bgColor = 'bg-red-600'
        if (post.isActive) {
            bgColor = 'bg-green-600'
        }
        postCard.innerHTML = `
        <div class="w-[5rem] h-[4rem] bg-white rounded-2xl relative">
            <img class="rounded-2xl" src="${post?.image}" alt="">
            <div class="h-5 w-5 ${bgColor} rounded-[6.25rem] border-2 border-solid border-white absolute -top-2 -right-2"></div>
        </div>
        <!-- card information -->
        <div class="space-y-4 w-full">
            <div class="flex gap-5 inter text-sm font-medium opacity-80">
                <p>#${post?.category}</p>
                <p>Author: ${post?.author?.name}</p>
            </div>
            <h3 class="text-xl font-bold">${post?.title}</h3>
            <p class="inter opacity-70">${post?.description}</p>
            <div class="border-t border-dashed border-[#12132D40] flex justify-between items-center pt-5">
                <div class="flex gap-5">
                    <div class="flex gap-2 items-center">
                        <img src="./icons/text.png" alt="">
                        <p>${post?.comment_count}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img src="./icons/eye.png" alt="">
                        <p>${post?.view_count}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img src="./icons/clock.png" alt="">
                        <p>${post?.posted_time} min</p>
                    </div>
                </div>
                <!-- message box Btn -->
                <button onclick="messageBoxBtn ('${post?.title}','${post?.view_count}')"><img src="./icons/messagebox.png" alt=""></button>
            </div>
        </div>
        `
        postsContainer.appendChild(postCard);
        
    });
    toggleLoadingSpinner (false)
}

function messageBoxBtn (cardTitle,viewCount){
    console.log(cardTitle,viewCount);
    /* add Counter */
    const totalReadCard = document.getElementById('totalReadCard')
    const readCardCount = totalReadCard.innerText;
    let count = parseInt(readCardCount);
    count = count + 1;
    totalReadCard.innerText = count;
    /* add title card */
    const titleCardContainer = document.getElementById('titleCardContainer')
    const titleCardDiv = document.createElement('div')
    titleCardDiv.classList = `bg-white rounded-2xl flex justify-between items-center p-4 gap-2 mb-5`
    titleCardDiv.innerHTML =`
    <p class="font-semibold w-9/12">${cardTitle}</p>
    <div class="flex gap-2 items-center w-3/12">
        <img src="./icons/eye.png" alt="">
        <p>${viewCount}</p>
    </div>
    `
    titleCardContainer.appendChild(titleCardDiv)
}

const handleSearch = () =>{
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    searchField.value = ''
    if (searchText !== '') {
        toggleLoadingSpinner(true);
    }
    console.log(searchText);
    setTimeout(() => {
        loadPost(searchText);
    }, 5000);
}

// ======== Section: Latest Posts ========
const loadLatestPosts = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const latestPosts = await res.json();
    console.log(latestPosts);
    displayLatestPosts(latestPosts);
}
loadLatestPosts ();

const displayLatestPosts = (latestPosts) => {
    const latestPostCardContainer = document.getElementById('latestPostCardContainer');
 
    latestPosts.forEach(latestPost => {
        const latestPostCard = document.createElement('div')
        latestPostCard.innerHTML = `
        <div class="p-6 h-full rounded-3xl border border-solid border-[#12132D26] space-y-3">
            <div class="w-full bg-[#12132D40] rounded-[1.25rem]">
                <img class="rounded-[1.25rem]" src="${latestPost?.cover_image}" alt="">
            </div>
            <div class="flex gap-3">
                <img src="./icons/calendar.png" alt="">
                <p class="opacity-70">${latestPost?.author?.posted_date || 'No publish date'}</p>
            </div>
            <h3 class="text-lg font-extrabold">${latestPost?.title}</h3>
            <p class="opacity-75">${latestPost?.description}</p>
            <div class="flex gap-4">
                <div>
                    <img class="w-11 rounded-[50%]" src="${latestPost?.profile_image}" alt="">
                </div>
                <div>
                    <h4 class="font-bold text-lg">${latestPost?.author?.name}</h4>
                    <p class="text-sm">${latestPost?.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
        `
        latestPostCardContainer.appendChild(latestPostCard);
    }); 
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loadingSpinner');
    const cardSection = document.getElementById('cardSection')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
        cardSection.classList.add('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
        cardSection.classList.remove('hidden');
    }
}