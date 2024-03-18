# Error Handling

### Handling errors through the template

When using template action helpers, playback failures do not throw errors. Instead, you'll detect if a sound has errored using a couple of template helpers.

<Docs::TemplateErrorsExample />

### Handling errors through the service

When interacting with the service, you'll handle errors like you'd expect.

<Docs::ServiceErrorsTryCatch />
<Docs::ServiceErrorsTryThen />
<Docs::ServiceErrorsSilenceError />
<Docs::ServiceErrorsThrowError />
