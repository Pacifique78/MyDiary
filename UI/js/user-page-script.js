let isAdd = true;
let myId = 'id';
const printEntry = () => {
    const myEntries = document.getElementsByClassName('entry');
    for (const entry of myEntries) {
        entry.addEventListener('click', () => {
            isAdd = false;
            myId = entry.querySelector('.id').textContent;
            document.getElementById('content-box').style.display = 'block';
            document.querySelector('.show-up').style.display = 'none';
            const date = entry.querySelector('.date-div').textContent;
            document.querySelector('.content-date').textContent = date;
            const title = entry.querySelector('.title').textContent;
            document.querySelector('.title-input').value = title;
            const message = entry.querySelector('.entry-content').textContent;
            document.querySelector('textarea').value = message;
        });
    }
};
printEntry();
const entries = document.getElementsByClassName('entry');
for (const entry of entries) {
    entry.addEventListener('click', () => {
        isAdd = false;
        myId = entry.querySelector('.id').textContent;
        document.getElementById('content-box').style.display = 'block';
        document.querySelector('.show-up').style.display = 'none';
        const date = entry.querySelector('.date-div').textContent;
        document.querySelector('.content-date').textContent = date;
        const title = entry.querySelector('.title').textContent;
        document.querySelector('.title-input').value = title;
        const message = entry.querySelector('.entry-content').textContent;
        document.querySelector('textarea').value = message;
    });
}
const previous = document.getElementById('previous');

previous.addEventListener('click', () => {
    const arr = Array.from(entries);
    for (const entry of entries) {
        const currentEntryTitle = document.querySelector('.title-input').value;
        if (currentEntryTitle === entry.querySelector('.title').textContent) {
            const index = arr.indexOf(entry);
            let previousEntry = arr[index - 1];
            if (index === 0) { previousEntry = entry; }
            const date = previousEntry.querySelector('.date-div').textContent;
            document.querySelector('.content-date').textContent = date;
            const title = previousEntry.querySelector('.title').textContent;
            document.querySelector('.title-input').value = title;
            const message = previousEntry.querySelector('.entry-content').textContent;
            document.querySelector('textarea').value = message;
            break;
        }
    }
});
const next = document.getElementById('next');
next.addEventListener('click', () => {
    const arr = Array.from(entries);
    for (const entry1 of entries) {
        const currentEntryTitle2 = document.querySelector('.title-input').value;
        if (currentEntryTitle2 === entry1.querySelector('.title').textContent) {
            const index = arr.indexOf(entry1);
            const nextEntry = arr[index + 1];
            const date = nextEntry.querySelector('.date-div').textContent;
            document.querySelector('.content-date').textContent = date;
            const title = nextEntry.querySelector('.title').textContent;
            document.querySelector('.title-input').value = title;
            const message = nextEntry.querySelector('.entry-content').textContent;
            document.querySelector('textarea').value = message;
            break;
        }
    }
});
const add = document.getElementById('add-entry');
add.addEventListener('click', () => {
    document.getElementById('content-box').style.display = 'block';
    document.querySelector('.show-up').style.display = 'none';
    document.querySelector('.title-input').value = '';
    document.querySelector('textarea').value = '';
});
const done = document.getElementById('done');
done.addEventListener('click', async (e) => {
    e.preventDefault();
    const title = document.querySelector('.title-input').value;
    const description = document.querySelector('textarea').value;
    if (isAdd) {
        const response = await fetch('http://localhost:4000/api/v2/entries', {
            method: 'POST',
            headers: {
                Authorization: sessionStorage.getItem('Authorization'),
                Accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });
        const json = await response.json();
        if (json.error) {
            if (json.status === 400) {
                document.querySelector(`.${json.path}-input`).placeholder = json.error;
            } else {
                document.getElementsByClassName('container')[0].style.display = 'none';
                document.getElementById('error').style.display = 'inline';
            }
        } else {
            location.reload();
        }
    } else {
        const response = await fetch(`http://localhost:4000/api/v2/entries/${Number(myId.slice(0, -1))}`, {
            method: 'PATCH',
            headers: {
                Authorization: sessionStorage.getItem('Authorization'),
                Accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });
        const json = await response.json();
        if (json.error) {
            if (json.status === 400) {
                document.querySelector(`.${json.path}-input`).placeholder = json.error;
            } else {
                document.getElementsByClassName('container')[0].style.display = 'none';
                document.getElementById('error').style.display = 'inline';
            }
        } else {
            location.reload();
        }
    }
});
const inputFile = document.getElementById('input-file');
const profilePicture = document.querySelector('.profile-image');
profilePicture.addEventListener('click', () => {
    inputFile.click();
});
inputFile.addEventListener('change', () => {
    const { files } = inputFile;
    if (inputFile.value) {
        profilePicture.setAttribute('src', `../images/${files[0].name}`);
    }
});
const deleteEntry = document.getElementById('delete-entry');
deleteEntry.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/v2/entries/${Number(myId.slice(0, -1))}`, {
        method: 'DELETE',
        headers: {
            Authorization: sessionStorage.getItem('Authorization'),
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
        },
    });
    if (response.status !== 204) {
        const json = await response.json();
        if (json.error) {
            if (json.status === 404) {
                document.getElementById('not-found-strong').innerHTML = 'The entry your trying to delete doesn\'t exists';
                document.getElementById('error-add-entry').innerHTML = 'Try again!!!';
                document.getElementById('not-found').style.display = 'inline';
            } else {
                document.getElementsByClassName('container')[0].style.display = 'none';
                document.getElementById('error').style.display = 'inline';
            }
        }
    } else {
        location.reload();
    }
});

const notification = document.getElementById('notification');
const notificationImg = document.getElementById('notification-img');
const notificationNumber = document.getElementById('notification-number');
const notificationMsg = document.querySelector('.notification-msg');
notification.addEventListener('click', () => {
    notificationMsg.style.display = 'block';
});
const more = document.getElementById('more');
const moreImg = document.getElementById('more-img');
const moreMsg = document.querySelector('.more-msg');
more.addEventListener('click', () => {
    moreMsg.style.display = 'block';
});
document.onclick = (event) => {
    if (event.target === notification) {
        notificationMsg.style.display = 'block';
        moreMsg.style.display = 'none';
    } else if (event.target === notificationImg) {
        notificationMsg.style.display = 'block';
        moreMsg.style.display = 'none';
    } else if (event.target === notificationNumber) {
        notificationMsg.style.display = 'block';
        moreMsg.style.display = 'none';
    } else if (event.target === more) {
        moreMsg.style.display = 'block';
        notificationMsg.style.display = 'none';
    } else if (event.target === moreImg) {
        moreMsg.style.display = 'block';
        notificationMsg.style.display = 'none';
    } else {
        notificationMsg.style.display = 'none';
        moreMsg.style.display = 'none';
    }
};
document.querySelector('.more-msg').addEventListener('click', () => {
    document.querySelector('.settings').style.display = 'flex';
});
document.getElementById('profile').addEventListener('click', () => {
    document.querySelector('.settings-profile').style.display = 'block';
    document.querySelector('.settings-settings').style.display = 'none';
});
document.getElementById('settings').addEventListener('click', () => {
    document.querySelector('.settings-settings').style.display = 'grid';
    document.querySelector('.settings-profile').style.display = 'none';
});
document.querySelector('.the-title').addEventListener('click', () => {
    document.querySelector('.settings-profile').style.display = 'none';
    document.querySelector('.settings-settings').style.display = 'none';
});
document.querySelector('.the-profile').addEventListener('click', () => {
    document.querySelector('.settings-profile').style.display = 'block';
    document.querySelector('.settings-settings').style.display = 'none';
});
document.querySelector('.the-setting').addEventListener('click', () => {
    document.querySelector('.settings-settings').style.display = 'grid';
    document.querySelector('.settings-profile').style.display = 'none';
});
document.getElementById('close-form').addEventListener('click', () => {
    document.querySelector('.settings').style.display = 'none';
});
const selectColor = () => {
    const fontColors = document.getElementById('choose-color');
    const selectedColor = fontColors.options[fontColors.selectedIndex].value;
    document.querySelector('.profile-list').style.background = selectedColor;
    document.querySelector('.content-box').style.background = selectedColor;
    document.querySelector('.content-date').style.color = selectedColor;
    document.querySelector('.content-title').style.color = selectedColor;
    document.querySelector('.title-input').style.color = selectedColor;
    document.querySelector('.footer-img').style.background = selectedColor;
    document.querySelector('.show-up').style.color = selectedColor;
    document.querySelector('.notification-msg').style.color = selectedColor;
    document.querySelector('.more-msg').style.color = selectedColor;
    document.querySelector('.settings-div').style.background = selectedColor;
    document.querySelector('.close').style.color = selectedColor;
    document.querySelector('.settings-header').style.color = selectedColor;
};
const selectFontFamily = () => {
    const fontFamilies = document.getElementById('choose-font');
    const selectedFontFamily = fontFamilies.options[fontFamilies.selectedIndex].value;
    document.querySelector('.container').style.fontFamily = selectedFontFamily;
};
document.getElementById('save-changes').addEventListener('click', () => {
    selectColor();
    selectFontFamily();
});
const mediaQuery500Px = window.matchMedia('(max-width: 500px)');

if (mediaQuery500Px.matches) {
    for (const entry of entries) {
        entry.addEventListener('click', () => {
            document.getElementById('content-box').style.display = 'block';
            document.querySelector('.show-up').style.display = 'none';
            document.querySelector('.profile-list').style.display = 'none';
            const date = entry.querySelector('.date-div').textContent;
            document.querySelector('.content-date').textContent = date;
            const title = entry.querySelector('.title').textContent;
            document.querySelector('.title-input').value = title;
            const message = entry.querySelector('.entry-content').textContent;
            document.querySelector('textarea').value = message;
        });
    }
    done.addEventListener('click', () => {
        document.querySelector('.profile-list').style.display = 'block';
        const title = document.querySelector('.title-input').value;
        const message = document.querySelector('textarea').value;
        const entryFound = Array.from(entries).find(entry => entry.querySelector('.title').textContent === title);
        if (entryFound) {
            String.prototype.convert = function (to, remove, addStr) {
                return this.slice(0, to) + addStr + this.slice(to + Math.abs(remove));
            };
            const slicedMessage = `${message.convert(60, 0, '<span class="hiden">')}</span>`;
            entryFound.querySelector('.entry-content').innerHTML = slicedMessage;
            document.getElementById('content-box').style.display = 'none';
            document.querySelector('.show-up').style.display = 'none';
        }
        if (!entryFound) {
            if (title) {
                String.prototype.convert = function (to, remove, addStr) {
                    return this.slice(0, to) + addStr + this.slice(to + Math.abs(remove));
                };
                const slicedMessage = `${message.convert(60, 0, '<span class="hiden">')}</span>`;
                const newDate = document.querySelector('.content-date').innerHTML;
                const newEntry = `<div class="entry"><div class="date-div">${newDate}<br></div><div class="entry-summary"><span class="title">${title}</span><br><span class="entry-content">${slicedMessage}</span></div></div>`;
                document.getElementById('list').innerHTML = document.getElementById('list').innerHTML + newEntry;
                document.getElementById('content-box').style.display = 'none';
                document.querySelector('.show-up').style.display = 'none';
            }
        }
    });
}
window.addEventListener('load', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/v2/entries', {
        headers: {
            Authorization: sessionStorage.getItem('Authorization'),
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
        },
    });
    const json = await response.json();
    document.getElementsByClassName('email')[0].innerHTML = json.userEmail || 'user-email@gmail.com';
    if (json.error) {
        if (json.status === 404) {
            document.getElementById('not-found').style.display = 'inline';
        } else {
            document.getElementsByClassName('container')[0].style.display = 'none';
            document.getElementById('error').style.display = 'inline';
        }
    } else {
        json.data.results.forEach((result) => {
            String.prototype.convert = function (to, remove, addStr) {
                return this.slice(0, to) + addStr + this.slice(to + Math.abs(remove));
            };
            const description = `${result.description.convert(60, 0, '<span class="hiden">')}</span>`;
            document.getElementById('list').innerHTML += `
        <div class="entry">
            <div class="date-div">
                <span>${result.createdon.split(' ')[0]}</span><br>
                <span>${result.createdon.split(' ')[1]}</span><br>
                <span>${result.createdon.split(' ')[2]}</span><br>
            </div>
            <div class="entry-summary">
                <span class="id"><strong>${result.id}.</strong> </span>
                <span class="title">${result.title}</span><br>
                <span class="entry-content">${description}</span>
            </div>
        </div>`;
        });
    }
    printEntry();
});
document.getElementById('error-try-again').addEventListener('click', () => {
    location.reload();
});
document.getElementById('error-add-entry').addEventListener('click', () => {
    document.getElementById('add-entry').click();
});
document.getElementById('signout').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('Authorization');
    window.location.href = '../index.html';
});
