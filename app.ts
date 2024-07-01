import blessed from 'blessed';

const screen = blessed.screen({
    smartCSR: true,
});
screen.title = 'blessed-exp';

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

const scroller = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-1',
    border: {
        type: 'line',
    },
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
        style: {
            bg: '#0000ff',
            track: '#ffffff',
        },
    },
    mouse: true,
});

const tweetsBox = blessed.layout({
    layout: 'inline-block',
    parent: scroller,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    tags: true,
});

const debugBox = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    mouse: false,
    content: '...',
    style: {
        fg: 'red',
        bg: 'white',
    },
});

const tweets = [
    'This is a tweet!',
    "And another one!\nP.S. It's multiline!",
    'And another one, very long!'.repeat(10),
    "That's all folks!",
];

function renderTweets() {
    tweetsBox.setContent('');
    tweets.forEach((tweet, index) => {
        const box = blessed.box({
            parent: tweetsBox,
            width: '100%',
            height: 'shrink',
            content: `tweet ${index}: ${tweet}`,
            mouse: true,
            border: {
                type: 'line',
            },
        });
        box.on('click', () => {
            debugBox.setContent(`tweet ${index} clicked!`);
        });
    });
}

renderTweets();

screen.render();
