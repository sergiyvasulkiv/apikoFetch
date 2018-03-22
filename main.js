let postId = location.href.split("?postId=", 2)[1];
let uesrId = location.href.split("?userId=", 2)[1];

vm = {
    postsList: ko.observableArray([]),
    usersList: ko.observableArray([]),
    commentsList: ko.observableArray([]),
    currentUser: ko.observable(),
    currentPost: ko.observable(),
    issinglePost: ko.observable(false),
    isPostsList: ko.observable(true),
    isUserPage: ko.observable(false),

    loadPostsList: () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => vm.postsList(json))
            .catch(err => console.log(err));
    },

    loadCommentstsList: () => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(json => vm.commentsList(json))
            .catch(err => console.log(err));
    },

    userPage: () => {
         fetch(`https://jsonplaceholder.typicode.com/users/${uesrId}`)
            .then(response => response.json())
            .then(json => vm.currentUser(json))
            .catch(err => console.log(err));
        vm.loadCommentstsList();
        vm.issinglePost(false);
        vm.isPostsList(false);
        vm.isUserPage(true);
    },

    singlePostPage: () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(json => vm.currentPost(json))
            .catch(err => console.log(err));
        vm.loadCommentstsList();
        vm.issinglePost(true);
        vm.isPostsList(false);
        vm.isUserPage(false);
    }
};
ko.applyBindings(vm);


(() => {
    if (location.href.endsWith("home.html")) {
        vm.loadPostsList();
    } else if (location.href.includes("?postId=")){
         isPost();
    }
     else if(location.href.includes("?userId=")){
        isUser();
    }
})();

function searpostId (post) {
    return post.id==postId;
};

function searuserId (user) {
    return user.id==uesrId;
};

function isPost() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json =>{
            if(json.some(searpostId)){
                vm.singlePostPage();
            }
        })
        .catch(err => console.log(err));
};

function isUser() {
     fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => {
            if(json.some(searuserId)){
                vm.userPage();
            }
        })
        .catch(err => console.log(err));
}
