
# Installation
```shell
ember install ember-stereo
```

### Optional configuration
By default `stereo` only includes the `NativeAudio` connection (to keep bundle size down) unless you specify otherwise in your environment. If your application needs Howler as a fallback option, or HLS support, include the following in your environment.js

```json
emberStereo: {
  connections: [
    { name: 'NativeAudio' },
    { name: 'Howler' },
    { name: 'HLS' }
  ]
}
```
