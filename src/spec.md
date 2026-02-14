# Specification

## Summary
**Goal:** Ensure the celebration view reliably displays the final uploaded photo from static frontend assets and fails gracefully if the image can’t be loaded.

**Planned changes:**
- Update the celebration view image `src` to use a valid static public path that matches an existing file under `frontend/public/assets/generated/` (correct filename + extension).
- Add image load error handling: show a small English fallback message in the UI when the photo fails to load, without breaking layout.
- Log a clear console warning that includes the failed image URL/path when the image load fails.

**User-visible outcome:** After clicking “Yes”, the celebration view displays the final photo on a fresh (hard) refresh; if it can’t load, the user sees a simple “Photo failed to load.” message and the page remains usable.
