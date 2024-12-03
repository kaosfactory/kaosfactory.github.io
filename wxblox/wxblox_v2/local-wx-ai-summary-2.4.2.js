function getCookieValue(name, defaultValue = null) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return defaultValue;
}


function toggleLoader(displayState) {
    document.getElementById('loader').style.display = displayState;
}

let useLocation = '';
async function fetchDataAndDisplaySummary() {
    const dataAttributes = getDataAttributes('.awxb-view[data-name]');
    if (!isValidLocation(dataAttributes)) {
        console.log('No location data, exiting.');
        return;
    }

    const location = getLocationString(dataAttributes);
    useLocation = location;
    const newDiv = createSummaryDiv();
    insertSummaryDiv(newDiv);

    const aiSummaryDiv = newDiv.querySelector('.aw-ai-summary');


    const encodedLocation = encodeURIComponent(location);
    let messageCount = 0;
    const messageListener = (message) => {
        if (!aiSummaryDiv) {
            return false;
        }
        if (messageCount < 1) {
            toggleLoader('none');
        }
        messageCount++;
        aiSummaryDiv.innerHTML += message;
    };

    const queryParams = new URLSearchParams(window.location.search);
    // if (queryParams.get('chatbot') === '1') {
        addAiWeatherChatToDom(aiSummaryDiv.parentElement, true);
    // }

    const summaryOptions = getSummaryOptions(location);
    await fetchStreamedResponse({
        url            : `https://api.weatherphrase.com/stream/summary/${encodedLocation}`,
        data           : summaryOptions,
        messageListener: messageListener,
        method         : 'GET',
        timeout        : 120000
    });


}


function addAiWeatherChatToDom(elem, append = true) {
    const chat = document.createElement('div');
    chat.className = 'xw-ai-chatbot';
    chat.innerHTML = `
        <button id="chatbotTrigger">AI Weather Chat</button>
        <div id="chatbot" class="chatbot-hide">
        </div>
    `;
    // if append is true, append chat to elem, else replace elem content with chat
    if (append) {
        elem.appendChild(chat);
    } else {
        elem.innerHTML = chat.innerHTML;
    }

    document.getElementById('chatbotTrigger').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button behavior
        toggleChatbot();
    });
    document.addEventListener('click', (event) => {
        const chatbot = document.getElementById('chatbot');
        if (chatbot && !chatbot.contains(event.target) && event.target.id !== 'chatbotTrigger') {
            hideChatbot();
        }
    });

}
function hideChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.add('chatbot-hide');
    }
}

function showChatbot() {
    const chatbotDiv = document.getElementById('chatbot');
    if (chatbotDiv) {
        console.log('useLocation', useLocation)
        chatbotDiv.classList.remove('chatbot-hide');
        const myChatBot = new Nimbus.ChatBot("chatbot", {
            streamKey  : appKeys.nimbus,
            streamUrl  : 'https://nimbus.weatherphrase.com/chatbot/weather',
            feedbackUrl: 'https://nimbus.weatherphrase.com/chatbot/weather/feedback',
            showMinimizeIcon: true,
            icons: {
                minimize: '<svg height="24px"   viewBox="0 0 512 512" width="24px" fill="currentColor"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>',
            },
            chatSettings: {
                defaultLocation: useLocation,
            },
            lastLocation: useLocation
        });

        setTimeout(() => {
            const closeIcon = document.querySelector('.nimbus-minimize-icon');
            if (closeIcon) {
                closeIcon.addEventListener('click', hideChatbot);
            }
            const smallCloseIcon = document.querySelector('.nimbus-minimize-menu-icon');
            if (smallCloseIcon) {
                smallCloseIcon.addEventListener('click', hideChatbot);
            }
        }, 300);
    }
}


function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.classList.contains('chatbot-hide')) {
        showChatbot();
    } else {
        hideChatbot();
    }
}



function getDataAttributes(selector) {
    const element = document.querySelector(selector);
    let attributes = {};
    if (element) {
        for (let key in element.dataset) {
            attributes[key] = element.dataset[key];
        }
    }
    return attributes;
}

function isValidLocation(attributes) {
    return attributes?.name && attributes?.country || attributes?.lat && attributes?.lon;
}

function getLocationString(attributes) {
    if (attributes?.name && attributes?.country) {
        return `${attributes.name},${attributes.state},${attributes.country}`;
    } else if (attributes?.lat && attributes?.lon) {
        return `${attributes.lat},${attributes.lon}`;
    }
    return '';
}

function createSummaryDiv() {
    const newDiv = document.createElement('div');
    newDiv.className = 'awxb-view';
    newDiv.innerHTML = '<h5 class="block-title">AI Weather Summary (Beta)</h5><div class="aw-ai-summary"><div class="loader" id="loader" style="display:block;"></div></div>';
    return newDiv;
}

function insertSummaryDiv(newDiv) {
    const awsOutlook = document.querySelector('div.awxb-view-outlook');
    // Delete all children in awsOutlook
    while (awsOutlook.firstChild) {
        awsOutlook.removeChild(awsOutlook.firstChild);
    }
    awsOutlook.appendChild(newDiv);

}

function getSummaryOptions(location) {
    return {
        client_id    : _wxbloxAccess?.id,
        client_secret: _wxbloxAccess?.secret,
        metric       : getCookieValue('wxblox_units', '0') === '1',
        limit        : 3,
    };
}

document.addEventListener('DOMContentLoaded', fetchDataAndDisplaySummary);
