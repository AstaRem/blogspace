let postsArray = []
let data = {}
let blogTitleSelector = document.getElementById("blog-title")
let blogTextSelector = document.getElementById("blog-text")
let blogForm = document.getElementById("blog-post-form")

function renderPosts(){
    let postHtml = ""
    for (let post of postsArray){
        postHtml += `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr />
        `
    }
    document.getElementById("content").innerHTML = postHtml

}

// gets blog posts from remote source using jsonPlaceholder API and renders to page at initial render
 fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
        })

// gets values, entered by user in the form
blogForm.addEventListener("submit", function(e){
    e.preventDefault()
    const blogTitle = blogTitleSelector.value
    const blogText = blogTextSelector.value
    data = {
        title: blogTitle,
        body: blogText
    }

    // posts these values to the server(submitted in form by user)
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(response => response.json())
        .then(data => {
            //we use .unshift in order to add the new post to the beginning, not .push to the end, because we want to see new post first 
            postsArray.unshift(data)
            renderPosts()
            blogForm.reset()
        
        })
})


// fetch("https://apis.scrimba.com/jsonplaceholder/posts/2/comments")
//     .then(response => response.json())
//     .then(comment => console.log(comment))