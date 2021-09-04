# Volume Control

Volume is set at a system level and it defaults to 100. The easiest volume control is a `<input type="range"/>` control, and to make things even easier you can use the `{{stereo-volume}}` modifier to turn it into a volume control. Job done.

That along with [stereo-volume](/docs/api/helpers/stereo-volume) and [toggle-stereo-mute](/docs/api/helpers/toggle-stereo-mute), you should be able to do everything you want in the template.

To adjust the stereo volume through the service, `stereo.volume` is a getter/setter

{{docs/stereo-player identifier="/sounds/angry-lady-ms-cleo.mp3"}}

{{docs/stereo-volume-example}}
