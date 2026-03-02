# Error Handling

## Server-Side

### Error Classes

```
BaseError (abstract)
  └── AppError
        ├── .validationError(message, fields?)  → 400
        ├── .authenticationError(message?)       → 401
        ├── .authorizationError(message?)        → 403
        ├── .notFoundError(message?)             → 404
        ├── .conflictError(message)              → 409
        └── .internalError(message?)             → 500
```

### asyncHandler

Wraps all API route handlers. Catches `AppError` instances and returns structured JSON:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "fields": [{ "field": "email", "message": "Required" }]
  }
}
```

Unknown errors return 500 with `INTERNAL_ERROR`.

## Client-Side

### normalizeError

Normalizes Axios errors into `NormalizedError`:

```typescript
{ code: ErrorCode; message: string; fields?: FieldError[] }
```

Use in catch blocks to display consistent error messages.
