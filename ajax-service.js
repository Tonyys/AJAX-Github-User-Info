// function getUserInfoOld(userLogin) {
//     const promise = $.ajax('https://api.github.com/users/'+ userLogin)
//
//     return promise
// }

function getUserInfo(userLogin) {
    const promise = axios.get('https://api.github.com/users/'+ userLogin)

    return promise.then((data)=> {
        return data.data;
    });
}

function getUserRepos(userLogin) {
    const promise = axios.get('https://api.github.com/users/'+ userLogin + '/repos')

    return promise.then((data)=> {
        return data.data;
    });
}