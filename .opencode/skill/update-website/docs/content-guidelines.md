# Website Content Guidelines

Standards for writing and updating website content.

## Tone & Voice

**Brand Voice:** "Sharp tools for hackers who remember when software didn't fight you"

**Characteristics:**
- Technical but accessible
- Problem-focused, not feature-focused
- Unix philosophy: minimal, readable, effective
- No marketing fluff or buzzwords
- Direct and honest

## Writing Style

### Tool Descriptions

**Structure:**
1. Lead with the problem being solved
2. Explain the solution briefly
3. Highlight key differentiators
4. Provide concrete examples

**Example:**
```
Bad: "Disclose is an advanced learning retrieval system with sophisticated filtering."

Good: "AI needs the right context, not everything. Disclose retrieves and bundles relevant learnings with token budget management, giving AI platforms exactly what they need."
```

### Feature Lists

**Do:**
- Focus on user benefits
- Use active voice
- Be specific and concrete
- Group related features

**Don't:**
- List technical implementation details
- Use passive voice
- Be vague or generic
- Mix unrelated features

**Example:**
```
Good:
- FTS5 full-text search finds relevant learnings in <100ms
- Token budget management fits context perfectly
- Semantic search combines keyword and conceptual matching

Bad:
- Has FTS5 support
- Token budgets are implemented
- Search is available
```

### Code Examples

**Requirements:**
- Always use real, tested commands
- Show expected output when helpful
- Use consistent formatting
- Include comments for clarity

**Format:**
```html
<pre class="code-snippet">$ command --flag value
Output: Result shown here

$ second-command
# Comment explaining what this does
Output: Second result</pre>
```

**Shell Prompts:**
- Use `$` for user commands
- Use `#` for comments
- Use plain text for output

### Installation Instructions

**Always include:**
1. Prerequisites (runtime, dependencies)
2. Installation command(s)
3. Verification step
4. Next steps

**Template:**
```markdown
## Installation

**Prerequisites:** [List required software]

**Install:**
```bash
[installation command]
```

**Verify:**
```bash
[verification command]
```

**Next:** [Link to getting started]
```

### Command Reference

**Format:**
```
command [required] [--optional]

Description of what the command does.

Options:
  --flag VALUE    Description of flag
  --option        Description of option

Examples:
  $ command example
  $ command --flag value
```

## HTML/CSS Guidelines

### Structure

**Use semantic HTML:**
```html
<!-- Good -->
<section class="features">
  <h2>Key Features</h2>
  <ul>
    <li>Feature description</li>
  </ul>
</section>

<!-- Bad -->
<div class="features">
  <div class="heading">Key Features</div>
  <div class="list">
    <div class="item">Feature description</div>
  </div>
</div>
```

### Class Naming

Follow existing patterns:
- `.tool-card` - Tool cards on home page
- `.feature-section` - Feature sections
- `.code-snippet` - Code examples
- `.terminal-demo` - Terminal demonstrations
- `.tool-header` - Tool card headers

### Responsive Design

**Always test:**
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

**Use existing breakpoints:**
```css
@media (max-width: 768px) {
  /* Mobile adjustments */
}
```

## Content Sections

### Index Page (Tool Overview)

**Required sections:**
1. Hero/Introduction
2. Key Features
3. Installation
4. Quick Start
5. Why We Built It
6. Links (Docs, GitHub)

**Tone:** Compelling but not salesy, focus on problems solved

### Getting Started Page

**Required sections:**
1. Prerequisites
2. Installation (detailed)
3. First Commands
4. Basic Workflow
5. Next Steps

**Tone:** Tutorial-style, step-by-step, encouraging

### Documentation Page

**Required sections:**
1. Command Reference (complete)
2. Configuration Options
3. Advanced Features
4. Integration Points
5. Troubleshooting

**Tone:** Reference-style, comprehensive, technically precise

### Examples Page

**Required sections:**
1. Common Use Cases
2. Real-World Examples
3. Integration Workflows
4. Advanced Patterns

**Tone:** Practical, showing real solutions to real problems

## Terminology

### Be Consistent

Use the same terms across all pages:
- "learning" not "lesson" or "insight"
- "context bundle" not "context pack" or "bundle pack"
- "session" not "run" or "execution"

### Project Names

**Correct capitalization:**
- hyphn (lowercase)
- rabit (lowercase)
- dispatch (lowercase)
- disclose (lowercase)
- gather (lowercase)
- catalog (lowercase)

**In sentences:**
- "The hyphn CLI..." (lowercase)
- "Hyphn provides..." (capitalize at start of sentence)

### Technical Terms

**Use industry-standard terms:**
- CLI (not "command line tool")
- API (not "programming interface")
- Markdown (not "markdown format")
- Git (not "git version control")

## Link Standards

### Internal Links

**Use relative paths:**
```html
<!-- Good -->
<a href="/disclose/getting-started.html">Getting Started</a>

<!-- Bad -->
<a href="https://fwdslsh.dev/disclose/getting-started.html">Getting Started</a>
```

### External Links

**Always verify before publishing:**
- GitHub repositories
- npm/package registries
- Documentation sites
- Related projects

**Use descriptive text:**
```html
<!-- Good -->
<a href="[url]">View on GitHub</a>

<!-- Bad -->
<a href="[url]">Click here</a>
```

## Image & Asset Guidelines

### Screenshots

**Requirements:**
- High resolution (2x for retina)
- Consistent styling/theme
- Relevant to content
- Annotated if necessary

**File naming:**
- `[tool]-[feature]-screenshot.png`
- `[tool]-demo-[number].png`

### Icons

**Tool icons:**
- Single letter in gradient circle
- Consistent size (40x40px default)
- Use CSS gradients (not images)

## Version References

### When to Update

**Always update when:**
- Version number changes
- Installation method changes
- Breaking changes occur

**Format:**
```html
<span class="version">v0.2.0</span>
```

**Locations to check:**
- Page title or hero
- Getting started
- Installation commands
- Changelog section

## Integration Examples

### Show Real Workflows

**Good:**
```bash
# Complete workflow showing tool integration
gather https://docs.example.com -o ./docs
catalog ./docs --output index
disclose pack --query "auth" --scope context
```

**Bad:**
```bash
# Isolated commands without context
tool1 command
tool2 command
```

## Accessibility

### Requirements

- Semantic HTML structure
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### Screen Reader Friendly

```html
<!-- Good -->
<button aria-label="Close navigation menu">×</button>

<!-- Bad -->
<div onclick="close()">×</div>
```

## Performance

### Keep It Fast

- Minimize inline CSS
- Use CSS classes, not inline styles
- Optimize images (compress, appropriate format)
- Avoid large embedded code blocks
- Use code collapse for long examples

## Testing Checklist

Before publishing:
- [ ] All code examples tested
- [ ] All links verified
- [ ] Responsive design checked
- [ ] Browser console clean (no errors)
- [ ] Spelling/grammar checked
- [ ] Version numbers current
- [ ] Installation instructions work

## Common Mistakes to Avoid

### ❌ Don't

1. **Copy/paste without testing**
   - Always test commands before publishing

2. **Use placeholder text**
   - Replace all TODOs and placeholders

3. **Reference deprecated features**
   - Remove outdated information

4. **Guess technical details**
   - Verify with project documentation

5. **Mix writing styles**
   - Maintain consistent tone

6. **Leave broken links**
   - Validate all links before deploy

### ✅ Do

1. **Test everything**
   - Especially installation and examples

2. **Update systematically**
   - Follow checklist, don't skip steps

3. **Commit incrementally**
   - One logical change per commit

4. **Get peer review**
   - Especially for major changes

5. **Document as you go**
   - Note decisions and rationale

6. **Think about the user**
   - What would help them most?

## Style Guide Summary

| Element | Style |
|---------|-------|
| Tone | Technical but accessible |
| Voice | Direct, honest, helpful |
| Code | Tested, with output shown |
| Links | Descriptive text, verified |
| Structure | Semantic HTML |
| Formatting | Consistent with existing |
| Terminology | Industry standard |
| Examples | Real-world, practical |

---

**Questions about style?**
- Check existing pages for patterns
- Ask maintainers for guidance
- Document new patterns you establish

**Last Updated:** 2026-01-13
