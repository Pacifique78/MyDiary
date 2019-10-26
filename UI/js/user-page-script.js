/* eslint-disable func-names */
/* eslint-disable no-extend-native */
const findDate = () => {
    const mydate = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    document.querySelector('.content-date').textContent = `${mydate.getDate()} ${months[mydate.getMonth()]} 2019`;
};
findDate();
const entries = document.getElementsByClassName('entry');
for (const entry of entries) {
    entry.addEventListener('click', () => {
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
done.addEventListener('click', () => {
    const title = document.querySelector('.title-input').value;
    const message = document.querySelector('textarea').value;
    const entryFound = Array.from(entries).find(entry => entry.querySelector('.title').textContent === title);
    if (entryFound) {
        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        const slicedMessage = `${message.splice(60, 0, '<span class="hiden">')}</span>`;
        entryFound.querySelector('.entry-content').innerHTML = slicedMessage;
        document.getElementById('content-box').style.display = 'none';
        document.querySelector('.show-up').style.display = 'block';
    }
    if (!entryFound) {
        if (title) {
            String.prototype.splice = function (idx, rem, str) {
                return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
            };
            const slicedMessage = `${message.splice(60, 0, '<span class="hiden">')}</span>`;
            const newDate = document.querySelector('.content-date').innerHTML;
            const newEntry = `<div class="entry"><div class="date-div">${newDate}<br></div><div class="entry-summary"><span class="title">${title}</span><br><span class="entry-content">${slicedMessage}</span></div></div>`;
            document.getElementById('list').innerHTML = document.getElementById('list').innerHTML + newEntry;
            document.getElementById('content-box').style.display = 'none';
            document.querySelector('.show-up').style.display = 'block';
        }
    }
});
const inputFile = document.getElementById('input-file');
const profilePicture = document.getElementById('profile-image');
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
deleteEntry.addEventListener('click', () => {
    const title = document.querySelector('.title-input').value;
    if (title) {
        const arr = Array.from(entries);
        const entry = arr.find(found => found.querySelector('.title').textContent === title);
        if (entry) {
            const confirmation = customConfirm('Do you rearly want to delete this entry???');
            if (confirmation === true) {
                entry.remove();
                document.getElementById('content-box').style.display = 'none';
                document.querySelector('.show-up').style.display = 'block';
            }
        }
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
