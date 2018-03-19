vm={

    postsList: ko.observableArray([]),
    usersList: ko.observableArray([]),
    commentsList: ko.observableArray([]),
    posttext:ko.observable("sometext"),
    currentPost:ko.observable({
        userId: "sreg",
        id: "",
        title: "Text for title",
        body: "Text for body"}),
    issinglePost:ko.observable(true),
    isPostsList:ko.observable(true),
    loadPostsList: function () {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
        .then(json =>   vm.postsList(json));
    },

    openPost:function (post) {
        vm.currentPost(post);
        vm.loadsinglePost();
        vm.loadCommentstsList();
        vm.isPostsList(false);
        vm.issinglePost(true);
    },
    loadCommentstsList: function () {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${vm.currentPost().id}`)
            .then(response => response.json())
    .then(json =>   vm.commentsList(json));
    },
    loadsinglePost: function () {
        fetch(`https://jsonplaceholder.typicode.com/posts/${vm.currentPost().id}`)
            .then(response => response.json())
    .then(json =>  {  vm.currentPost(json); vm.posttext(json.body);console.log(vm.currentPost())});
    },


};




vm.loadPostsList();
console.log(vm.currentPost());
ko.applyBindings(vm);
