import Route from '@ember/routing/route';

export default class Players extends Route {
  model() {
    return {
      url: '/sounds/works-just-like-a-vcr.mp3',
      swappable: [
        { title: 'Local mp3', url: '/sounds/works-just-like-a-vcr.mp3' },
        { title: 'Another local mp3', url: '/sounds/video-professor.mp3' },
        { title: 'Short clip', url: '/sounds/attention.mp3' },
        {
          title: 'Remote ogg',
          url: 'https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg',
        },
        { title: 'Live stream', url: 'https://stream.wqxr.org/wqxr' },
      ],
      unplayable: '/sounds/unplayable-scooby.au',
    };
  }
}
