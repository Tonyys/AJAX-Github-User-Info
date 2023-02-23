const ajaxResult = document.querySelector('.ajax-result')
const userLogin = document.querySelector('.user-login')
const userName = document.querySelector('.user-name')
const userAvatar = document.querySelector('.ajax-avatar')
const userLink = document.querySelector('.user-link')
const inputLogin = document.querySelector('.input-login')
const ajaxBtn = document.querySelector('.ajax-btn')
const ajaxItems = document.querySelector('.ajax-items')
const userResetInfo = document.querySelector('.user-reset')

ajaxBtn.addEventListener('click',()=>{
    const promiseUser = getUserInfo(inputLogin.value);
    promiseUser.then(onDataReceived).catch(failGetingData);

    const promiseUserRepos = getUserRepos(inputLogin.value);
    promiseUserRepos.then(onReposReceived);
})
userResetInfo.addEventListener('click',()=> {
    userName.innerHTML = '<span>Login </span>';
    userLogin.innerHTML = '<span>Name </span>';
    userLink.innerHTML = '<span>GitHub </span>';
    userAvatar.src = '';
    ajaxItems.innerHTML = '';

    ajaxResult.style.display = 'flex';
    ajaxResult.innerHTML = 'Here will be repositories';
})
function onDataReceived (data) {
    const loginSpan = document.createElement('span')
    const hiElement = document.createElement('span')
    const linkElement = document.createElement('a')

    // reset result
    userName.innerHTML = '<span>Login </span>';
    userLogin.innerHTML = '<span>Name </span>';
    userLink.innerHTML = '<span>GitHub </span>';
    userAvatar.src = '';

    if (data.name) {
        hiElement.style.color = 'red'
        hiElement.innerHTML = data.name;
        userName.appendChild(hiElement);
    }
    if (data.login) {
        loginSpan.style.color = 'red'
        loginSpan.innerHTML = data.login;
        userLogin.appendChild(loginSpan);
    }
    if (data.avatar_url) {
        userAvatar.src = data.avatar_url;
    }
    if (data.html_url) {
        linkElement.href = data.html_url;
        linkElement.classList.add('user-id-link')
        linkElement.innerHTML = 'ID: ' + data.id;
        linkElement.target = '_blank';
        userLink.appendChild(linkElement);
    }


}

function onReposReceived (data) {
    // reset result
    ajaxResult.style.display = 'none';
    ajaxItems.innerHTML = '';

    data.forEach(el=> {
       const project = document.createElement('div');
       project.classList.add('ajax-item');

       const projectInfo = document.createElement('div');

       const projName = document.createElement('a');
       const projDesc = document.createElement('p');
       const projPopularLang = document.createElement('span');
       const projDate = document.createElement('span');

       if (el.name) {
           projName.classList.add('ajax-item-name');
           projName.innerHTML = el.name;
           projName.href = el.html_url;
           projName.target = '_blank';
           project.appendChild(projName);
       }

        if (el.description) {
            projDesc.classList.add('ajax-item-desc');
            projDesc.innerHTML = el.description;
            project.appendChild(projDesc);
        }

        projectInfo.classList.add('ajax-item-info');
        project.appendChild(projectInfo)

        if (el.language) {
            projPopularLang.classList.add('ajax-item-lang');
            projPopularLang.innerHTML = el.language;
            projectInfo.appendChild(projPopularLang);
        }

        if (el.updated_at) {
            const updateDate = new Date(el.updated_at).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric' });
            projDate.classList.add('ajax-item-date');
            projDate.innerHTML = 'Updated ' + updateDate;
            projectInfo.appendChild(projDate);
        }

        console.log(project);
        ajaxItems.appendChild(project);
    })
}

function failGetingData () {
    ajaxResult.innerHTML = 'Sorry this user not found or we have problems with server';
    ajaxResult.style.display = 'flex';
}