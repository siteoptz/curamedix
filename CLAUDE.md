# Claude Code Rules for CuraMedix Project

## CRITICAL: Styling-Only Requests

When the user requests ONLY styling fixes (mobile centering, responsive design, CSS adjustments):

### DO:
1. **ONLY modify CSS files** (`styles.css` or similar)
2. **NEVER touch HTML files** unless explicitly asked
3. **Make minimal, targeted changes** to fix the specific issue
4. **Test changes incrementally** - apply one fix at a time
5. **Preserve all existing functionality** - images, forms, scripts, etc.

### DO NOT:
1. **NEVER overwrite working HTML files**
2. **NEVER remove or modify existing content** (images, backgrounds, forms)
3. **NEVER add new HTML elements** unless specifically requested
4. **NEVER "improve" or "enhance"** beyond the stated request
5. **NEVER assume additional changes are needed**

## File Management Rules

### Working Files Identification:
- `index.html` = Primary working file with all content intact
- `hubspot-final-complete.html` = HubSpot deployment version
- `styles.css` = Main stylesheet

### Before Making Changes:
1. **Always identify the working file first**
2. **Read the file to understand current state**
3. **Confirm what specific issue needs fixing**
4. **Apply minimal changes only**

### Backup Strategy:
- **NEVER overwrite working files without explicit permission**
- **Create backups before major changes**
- **Test changes on copies first if unsure**

## Mobile Styling Guidelines

For mobile responsive fixes:
1. **Use CSS media queries only** (`@media (max-width: 768px)`)
2. **Add overflow-x: hidden** to prevent horizontal scrolling
3. **Ensure containers are 100% width** with proper box-sizing
4. **Use flexbox for centering** when appropriate
5. **Make footer full-width** with viewport techniques if needed

## HubSpot Integration Rules

When working with HubSpot files:
1. **Always include required tags**:
   - `{{ standard_header_includes }}` before `</head>`
   - `{{ standard_footer_includes }}` before `</body>`
2. **Preserve all existing HubSpot functionality**
3. **Don't modify form structures** unless explicitly requested

## Error Prevention

### Before Every Change:
1. **Ask yourself**: "Am I changing only what was requested?"
2. **Verify**: "Will this preserve all existing functionality?"
3. **Confirm**: "Am I making the minimal change needed?"

### Red Flags - STOP if you're about to:
- Rewrite entire files
- Remove existing content
- Add new features not requested
- Modify working HTML when only CSS changes were asked for

## Communication Protocol

### When Uncertain:
1. **Ask for clarification** before making changes
2. **Explain what you plan to change** before doing it
3. **Confirm the specific file** to modify

### Progress Updates:
1. **Use TodoWrite** for multi-step tasks
2. **Mark tasks complete** only when fully done
3. **Report what was actually changed**

---

**Remember**: The user's existing setup works. They usually need small fixes, not complete rewrites.