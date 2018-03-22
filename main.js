const postUrl = "?postId=";
const userUrl = "?userId=";
const homeUrl = "home.html";
let postId = location.href.split("?postId=", 2)[1];
let uesrId = location.href.split("?userId=", 2)[1];
let postExist = false;
let userExist = false;

async function validhref() {
    await isPost(postId);
    await isUser(uesrId);

    if (location.href.endsWith(homeUrl)) {
        vm.loadPostsList();
    } else if (postExist) {
        vm.singlePostPage();
    } else if (userExist) {
        vm.userPage();
    }
}
validhref();

async function isPost(id) {
    await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
            json.forEach(post => {
                if (id == post.id) {
                    postExist = true;
                }
            });
        })
        .catch(err => console.log(err));
}

async function isUser(id) {
    await fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => {
            json.forEach(user => {
                if (id == user.id) {
                    userExist = true;
                }
            });
        })
        .catch(err => console.log(err));
}

vm = {
    postsList: ko.observableArray([]),
    usersList: ko.observableArray([]),
    commentsList: ko.observableArray([]),
    currentUser: ko.observable(),
    currentPost: ko.observable(),
    issinglePost: ko.observable(false),
    isPostsList: ko.observable(true),
    isUserPage: ko.observable(false),

    loadPostsList: async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
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

    userPage: async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${uesrId}`)
            .then(response => response.json())
            .then(json => vm.currentUser(json))
            .catch(err => console.log(err));
        await vm.loadCommentstsList();
        vm.issinglePost(false);
        vm.isPostsList(false);
        vm.isUserPage(true);
    },

    singlePostPage: async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
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
