// function getUserInfoOld(userLogin) {
//     const promise = $.ajax('https://api.github.com/users/'+ userLogin)
//
//     return promise
// }

const getUserInfo = async (userUrl)=> {
    const promise = await fetch(`https://api.github.com/users/${userUrl}`)
    const result = await promise.json()
    return result
}

const getUserRepos = async (userUrl)=> {
    const promise = await fetch(`https://api.github.com/users/${userUrl}/repos`)

    const result = await promise.json()
    return result
}