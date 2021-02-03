
# Installation
```shell
ember install ember-hifi
```

### Optional configuration
By default `hifi` only includes the `NativeAudio` connection (to keep bundle size down) unless you specify otherwise in your environment. If your application needs Howler as a fallback option, or HLS support, include the following in your environment.js

```json
emberHifi: {
  connections: [
    { name: 'NativeAudio' },
    { name: 'Howler' },
    { name: 'HLS' }
  ]
}
```