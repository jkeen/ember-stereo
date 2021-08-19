# Error Handling

### Handling errors through the template

When using template action helpers, playback failures do not throw errors. Instead, you'll detect if a sound has errored using a couple of template helpers.
{{docs/template-errors-example}}

### Handling errors through the service

When interacting with the service, you'll handle errors like you'd expect.

{{docs/service-errors-try-catch}}
{{docs/service-errors-try-then}}
{{docs/service-errors-silence-error}}
{{docs/service-errors-throw-error}}
