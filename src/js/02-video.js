import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_KEY = 'videoplayer-current-time'

player.on('timeupdate', throttle(function (event) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(event.seconds));
  }, 1000)
);
const currentTime = localStorage.getItem(CURRENT_KEY);
player.setCurrentTime(currentTime);
