// Speed Highlight wrapper to handle indentation normalization and async loading
// Using dynamic imports to keep initial bundle size small

export async function applySpeedHighlight() {
    try {
        // Dynamically import speed-highlight
        const { highlightElement } = await import('/assets/vendor/speed-highlight/dist/index.js');
        const { detectLanguage } = await import('/assets/vendor/speed-highlight/dist/detect.js');

        // Select all code blocks
        // We look for .code-block pre (standard), .code-snippet, and .install-code
        const codeBlocks = document.querySelectorAll('.code-block pre, .code-snippet, .install-code');
        
        codeBlocks.forEach((block) => {
            // Skip if already processed (check for shj-lang class)
            if (block.className && block.className.includes('shj-lang-')) return;
            
            const normalized = block.textContent;
            
            // Create wrapper div required by speed-highlight
            const wrapper = document.createElement('div');
            
            // Preserve existing classes but ensure shj-lang-plain is present as fallback
            const existingClass = block.className || '';
            wrapper.className = `${existingClass} shj-lang-plain`.trim();
            
            // Set normalized content
            wrapper.textContent = normalized;
            
            // Replace original element with wrapper
            block.replaceWith(wrapper);
            
            // Detect language if not explicitly set in class
            // (speed-highlight looks for shj-lang-[language])
            let lang = 'plain';
            
            // Check if class already has a language specified (e.g. language-js or shj-lang-js)
            const langMatch = existingClass.match(/(?:language|shj-lang)-([a-z]+)/);
            if (langMatch) {
                lang = langMatch[1];
                // Ensure proper class format for speed-highlight
                if (!wrapper.classList.contains(`shj-lang-${lang}`)) {
                    wrapper.classList.add(`shj-lang-${lang}`);
                }
            } else {
                // Auto-detect
                lang = detectLanguage(normalized) || 'plain';
                wrapper.classList.remove('shj-lang-plain');
                wrapper.classList.add(`shj-lang-${lang}`);
            }
            
            // Apply highlighting
            highlightElement(wrapper, lang);
        });

        // Add copy functionality to highlighted blocks
        document.querySelectorAll('.install-code, .code-snippet, .code-block [class*="shj-lang-"]').forEach(codeBlock => {
            codeBlock.style.cursor = 'pointer';
            codeBlock.title = 'Click to copy';
            
            // Remove any existing click listeners to avoid duplicates (though difficult without reference)
            // safer to just ensure we don't double-add logic if we run this multiple times
            if (codeBlock.dataset.hasCopyListener) return;
            
            codeBlock.addEventListener('click', function() {
                const text = this.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    // Visual feedback
                    const original = this.style.backgroundColor;
                    this.style.backgroundColor = 'rgba(63, 185, 80, 0.2)'; // Green tint
                    
                    setTimeout(() => {
                        this.style.backgroundColor = original || '';
                    }, 200);
                }).catch(err => {
                    console.error('Copy failed:', err);
                });
            });
            
            codeBlock.dataset.hasCopyListener = 'true';
        });
        
    } catch (e) {
        console.error('Speed Highlight failed to load:', e);
    }
}
